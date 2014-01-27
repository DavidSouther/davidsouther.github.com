---
layout: post
title: "Cucumber Selenium Mappings Model"
date: 2014-01-27 10:52:00 -0500
published: true
categories: 
- Technology
tags:
- cucumber
- cucmberjs
- selenium
- webdriver
- cuke

---

To create a ubiquitous language for a project's interface, I recommend creating
a semantic mapping. This is an in-code key/value object defining words and
phrases in a [ubiquitous language][fowler_ul] that maps to a specific CSS
selector for use in code. This has many advantages, with a couple draw backs.
The benefits of having a ubiquitous language are documented in various sources,
but in sum, mean less time wasted in a team discussing which piece of the
solution is under discussion. This exact solution has some specific drawbacks,
that I'll mention later.

A Cuke mapping, here, is a set of nouns and noun phrases that describe some part
of a DOM interface. In one example, the application has a main content area. The
mapping is relatively simple: `'main content': '#main'` (coffeescript key/value
bare object). The same application has two distinct menu areas, which are mapped
with `'main menu': 'main [tab-nav="tab-nav"]'` and `'page menu': 'main div
[tab-nav="tab-nav"]'`. The subtleties in DOM structure are hidden behind this
mappings concept. If the DOM changes, the tests can be fixed by eding the
selector in a single place.

<!-- more -->

## Given/When/Then

Short aside to cover the basics of Cuke best practices. As is recommended in
automated testing scenarios, each test has five phases. Two of those phases are
hidden in the test harness, the before and after test setup phases. The test
itself is broken into application state setup, taking an action, and asserting
aspects of the final state. Yes, testing is exercising the big old state
machine of your application - put the program in some state, take an action,
make sure it's in the expected next state.

In Cucumber, these phases are described with the phrases `Given`, `When`, and
`Then`. The `Given` assertions are grouped at the beginning of the test, where
they include things specific to the test that the `Before` steps haven't
covered. For a large application I work on, `Before` guarantees the browser will
be open, and on the root page of the application (`http://localhost:1024/`).
Because of this, we sometimes drop the `Given` state, or use a dummy noop step,
`Given the user is on the home page`. However, when verifying some action on a
specific page, we will use `Given` to navigate to the page under test. `Given
the user navigates to "Performance" "Summary"`.

The `When` and `Then` tests are pretty straightforward, and for this application
generally click some DOM node, then check some other DOM status, often for the
presence of a string in text, or the presence or absence of a node. Some of our
tests, however, assert rendered properties, especially dimension constraints.
For instance, we have asserts to check if elements of the page are on the top,
left, or center of a page, or meet certain minimum and maximum size constraints.
Finally, we have tests that assert look and feel by comparing screenshot image
differences.

There is some discretion in choosing when to use `Given` vs when to use
`When` - are the values filled in a form part of the given condition, or part of
the test action? I find this depends on what state transition is under test. If
the test is verifying the form shows validation rules for invalid input, the
form filling should be a `When` statement. On the other hand, if the test is
verifying a "Thanks for shopping!" page, the form should be filled in `Given`
steps. Cucumber itself relaxes constraints, and doesn't actually enforce only
steps only run in their defined phase, so in reality any step can match
anywhere.

## Mappings

When writing steps, cucumber uses regular expression matching groups to pass
arguments to the step body. Generally, these the form `/"([^"]+)"/`, matching
any non-zero length of string inside double quotation marks. That value then is
passed to the step definition function, in argument order. For cuke mappings, we
constrain the valid items within quotes, to either be a key in the mappings
table, or a string literal to assert in some test.

Here's a line from our tests.

```
Then the "header nav" should have links to
    """
    Dashboard
    Portfolios
    """
```

The step definition matches the first quote group against the mappings object,
here finding the expression `"#header nav"` as the CSS to select with. It can
then look for links to each of the titles in the list of expected links. The
full step is defined as

```coffeescript
    @Then /"([^"]+)" should have links to/, (selector, list)->
        selector = mappings[selector] + ' a'
        @world.text(selector)
        .then (text)->
            for link in list.split '\n'
                text.indexOf(link).should.be.greaterThan -1
```

This test creates a selector by looking for any `a` children of the selector
for `"header nav"`, asking the world to return the joined text for all those
elements, and asserting that each link text is in that joined string. Also, this
test is using the [qcumber][qcumber] cucumberjs library, which makes steps
behave with promises - a step can return a value, throw an exception, or return
a promise. It will pass if a value is returned or a returned promise resolves,
and will fail if an exception is thrown, or a returned promise rejects.

## World

The world object abstracts the details of working with a browser backend. This
allows an abstraction between the steps' browser interaction, and the actual
browser backend. Most commonly, `selenium-webdriver` serves as the browser
backend, but that could be replaced with `browserstack-webdriver` for
[browserstack][browserstack] testing in CI or [Zombie][zombie], for headless,
pure-js testing.

[fowler_ul]: http://martinfowler.com/bliki/UbiquitousLanguage.html
[qcumber]: https://github.com/DavidSouther/qcumber
[browserstack]: http://www.browserstack.com/
[zombie]: http://zombie.labnotes.org/

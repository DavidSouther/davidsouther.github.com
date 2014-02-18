---
layout: post
title: "5 surprisingly not that painful things about client-side JS"
date: 2014-02-17 22:33:25 -0500
comments: true
categories: 
- Technology
tags:
- angularjs
- angular
- front end
- client side
---

I'm a huge fan of [AngularJS][angularjs]. Over at [Sourcegraph][sourcegraph],
they seem to be [having some problems][switching]. Never one to back down from a
holy war, I'll post a rebuttal for how we're using Angular to great effect at
[Novus][novus], and how we've gotten around the problems they mention.

<!--more-->

1. **Bad search ranking and Twitter/Facebook previews**

    Sourcegraph thinks it's hard to present a reasonable SPA to crawlers, and
    they're absolutely correct. Especially for a site like theirs, which is creating
    large amounts of dynamic content with few caching opportunities, rendering a
    page for a crawler is expensive and will probably only be used a single time.
    Their analysis of the solutions, either rewritting all your pages server side or
    handling a farm of headless browsers to pre-render for the server are about the
    only ways to handle the situation.

    This is a problem, and something that is being actively pursued by the
    community. For Novus, however, we sidestep this. The places we need search
    rankings, we publish a static site. Our primary application is for our customers
    only, and even if you did crawl it, you'd get a bunch of nvd3 graphs and charts.
    Actually, I'll go even further for this. In the places you need SEO, you are
    probably better using a static site generator - the SPA architecture is for
    long-lived, data heavy, dynamic pages. I love angular, but this site is run on
    [Jekyll][jekyll].

1. **Flaky stats and monitoring**

    Sourcegraph argue that it's hard to integrate a third-party analytics provider
    with an SPA. There are tricky issues with the HTML5 history api, and what about
    the replaceState events? And when you found out you tracked it wrong, it's nigh
    impossible to recover those stats.

    This argument is dubious to me, at best. I can see that tacking tracking on
    after the fact can get tricky. At Novus, we've got very clear eventing seams,
    which make obvious where to attach tracking hooks. We test our tracking hooks
    during our regression tests (that's a blog post for itself). I wouldn't say it's
    been easy, but with clear architecture up front, we're doing pretty well.

1. **Slow, complex build tools**

    Sourcegraph doesn't like [ng-bilerplate][ngbp]. They find Grunt configurations
    complex, and FE build tools too be slow. I guess they've never compiled a QT C++
    application. JS build times are teh slowz! they say. And ngmin takes forever!

    I agree, ngbp has a mediocre Gruntfile at best. At Novus, we have IMHO a much
    better setup. Currently, we can run our entire build suite, including feature
    tests, in about a minute; that's six projects, three of which can be run
    parallel, and 30 seconds of feature testing (more in 4). Each project,
    individually, takes about a half second to lint & build, and another 2 to 5
    seconds to run their full suite of tests (between a dozen and half-a-hundred,
    but growing). We have several mechanisms in place to pare down the test run, to
    only run the tests of the component under active development.

    Don't get me wrong, the last project I was on had single-module build times of
    over a minute (on the lead devs machine, one guy was getting three+ minute build
    times for CSS changes). You can write bad build configurations. We haven't.

    Oh, if you want to see parts of our kick-ass build process, check out my [TDD
    AngularJS tutorial][tdd-angular].

1. **Slow, flaky tests**

    Souregraph seems to have problems with browser-based feature tests. It took us
    all of 8 lines in 3 config files to set up and run headless Firefox on our CI
    server. Running the entire Browserstack matrix is going to be a different beast,
    but that's because of our IT department's (justified) security concerns. As for
    the "flakiness" of the tests, every time we've had a feature test fail, it's
    been because of a real regression we introduced into the codebase.

    We've taken an approach to feature testing that I've outlined as the [Cucumber
    Selenium Mapping Model][csmm]. It's served us fantastically well, and I'd
    encourage others to take a look at it.

1. **Slowness is swept under the rug, not addressed**

    Sourcegraph claims SPAs make it easier to ignore performance issues. This is not
    an argument about SPAs, this is an argument against lazy programmers.

    I'm about 4 hours in to re-architecting our page load/event flow because our
    page has been loading too slowly. I have test harness code designed specifically
    to introduce slowness into our system, to emulate long/hung/failed/exceptional
    asynch requests, to see how well they're handled. I am doing this, because our
    UX lead has been complaining (and I've been noticing) stutterings in the UI,
    which our metrics show are happening on requests that are, get this, over ~200
    milliseconds.

    Angular does not make a page laggy, bad programmers make a page laggy.

## Choose the right tool

Sourcegraph's closing line is a fine token gesture, "[Angular wasn't] the right
tool for our site." Looking at their site and team, I'd tend to agree. I don't
know how I'd have architected it up front, but Angular (and indeed, SPAs) are
not the best option for a small to medium traffic volume static on demand site.
That is not a reason to decry all front end build tools as an immense web of
problems.

I don't know why they published their piece - they must be having (or have had)
some frustrations. I am here to tell you that none of these needed to be
problems. If you have a site that you think needs Angular, these problems have
solutions. Better than that, many will not be problems, if you take a bit of
pride and architecture in your projects.

Happy hacking!

[angularjs]: [http://angularjs.org/]
[sourcegraph]: https://sourcegraph.com/
[switching]: https://sourcegraph.com/blog/switching-from-angularjs-to-server-side-html
[novus]: http://novus.com
[jekyll]: [http://jekyllrb.com/]
[csmm]: http://davidsouther.com/2014/01/cucumber-selenium-mappings-model/
[tdd-angular]: http://davidsouther.com/tdd-angular/
[ngbp]: http://joshdmiller.github.io/ng-boilerplate/#/home
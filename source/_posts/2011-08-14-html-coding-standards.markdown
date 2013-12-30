---
author: admin
comments: true
date: 2011-08-14 04:03:45+00:00
layout: post
slug: html-coding-standards
title: HTML Coding Standards
wordpress_id: 111
categories:
- Coding Standards
- Technology
tags:
- coding
- HTML
- standards
- style guidelines
---

### Doctype
  * `<!DOCTYPE html>`
    * In the age of HTML5, this is all you need, and it’s a full 2/3s the length of an html4 transitional DOCTYPE.

### html
  * No xmlns
    * You’re writing html5. Even in xhtml, when’s the last time you needed to embed an alternative xmlns in your docs? (If you’re working on a project that actually does use namespacing, than you aren’t using HTML5)
  * Specify `lang="en"` (or whatever your page’s language is)	
    * It’s just good practice to tell everyone what you’re speaking before you start talking. Plus, Google Chrome will pop up the little “Want to translate this page?” bar for your foreign visitors!
### head

  * `<meta charset="utf-8" />` should be the first tag in the head, and must be in the first 512 bytes of the page.
    * Always specify the encoding. It’s just good practice.
  * No content-type meta tag (should be set in HTTP headers)
    * If you don’t have control over this, and your host isn’t set up correctly, you should be having a conversation with your server.
  * `<title>` MUST be present and have sensible text content.
  * `<script>` and `<link rel="stylesheet">` tags should be grouped together, separated by whitespace	
    * That is, put all your scripts, then a blank line, then all your stylesheets. Or vice versa. If they’re grouped, it’s just that much easier to find.
  * `<script>` tags should only use the href attibute- they MUST NOT contain actual script code.
    * MVC is a Good Thing. If your framework doesn’t make it trivially easy to add a new script to the page for a new feature, take a look at your framework.
  * `<script>` and `<link>` tags should not specify a type.	
    * The type will be sent by the HTTP headers.
  * `<style>` tags ARE NOT allowed.
    * See MVC is Good above.
### body
  * Every block level opening tag must be on its own line.
  * Every block-level closing tag must be on its own line.
  * Exceptions for the first element inside the `<body>` tag.
  * Every block level element should be indented the same tab level as its siblings, which is one more than its parent.
  * One blank line when separating sibling block-level tags.
    * Exception: when mixing `<h_x_>`, `<p>`, and `<div>` inside a block, do not separate with whitespace.	
    * Example:
```html
<h2>This Section</h2>
Paragraph 1

Paragraph 2
<ul>
	<li>Some</li>
	<li>list</li>
	<li>stuff</li>
</ul>
```
      * Be sensible with classes and ids.	
        * ids should be used on nodes that need to be uniquely and quickly identified
          * eg. specific content blocks, `<a>` buttons, forms.
        * Classes should be used to reduce or eliminate redundancy in CSS
      * classes and ids must use dashes between words, NOT camel case
        * eg. `about-scanning`, `content-left` instead of `aboutScanning`, `contentLeft`
          * This guarantees html classes and IDs cannot conflict with javascript or php variables. This means when you forget quotes in selectors, like $(my-id), there’s a much higher chance of the JS interpreter throwing a syntax error, instead of making you wonder how my_id happened to get defined to “#other-thing” in a global block somewhere.
      * Text must be inside `<p>` or `<h_x_>` tags.
      * Content must be grammatically correct English.
        * The web is a written medium. There are reasons grammar has formed the way it has. Please, as a content provider, take pride in what you write and pride in how it is communicated in this medium.	
      * `<p>` must contain complete sentences (capitalized, subject-verb-predicate, period)	
        * Semantically, `<p>` is a paragraph, which means blocks of text. Thesis sentence, three or four supporting arguments, conclusion sentence. No, not every page is an essay, but the semantic difference between `<p>` and `<h_x_>` makes all the difference to your readers, and should play a part in SEO.
      * Largish blocks of text (blocks of content, not buttons or headings) can use a Lorem text if final content is not available.
        * Use a good Lorem text generator
          * [http://www.lipsum.com/ ](http://www.lipsum.com/%20)
          * [http://hipsteripsum.me/](http://hipsteripsum.me/)

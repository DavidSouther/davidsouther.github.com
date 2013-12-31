---
author: admin
comments: true
date: 2012-07-09 13:23:43+00:00
layout: post
slug: html5-form-validation
title: HTML5 Form Validation
wordpress_id: 411
categories:
- Technology
tags:
- forms
- HTML
- html forms
- html5
- jquery
- validation
---

Client-side form validation is a cross-cutting concern helping users get the most correct data into a form as quickly as possible. Good form validation will tell users what fields are most important in your form and exactly what is expected of their input. Form validation is not concerned with guaranteeing correct data gets sent from the user agent to the service backing the form -- the service should define its own data ingestion and validation concerns. This discussion is only concerned with client-side form validation and helping users input acceptable data.

<!-- more -->

In this view, the form itself is an entire application, independent of any other piece of software. The form, rendered in the browser DOM, provides visual elements for a user to provide input. As the user provides input, the form will indicate whether that data is correct, perhaps by highlighting the field in green, or provide warnings that the data is invalid, perhaps by highlighting the field in red and displaying a light-weight pop-up with a polite message describing what, exactly, is wrong with the input. When the user tells the form to submit data, the form can decide if the input is appropriate, and if so pass that data on to some other service. Generally, this will be an HTTP POST, but could occur as a full page redirect or an AJAX request. In a more exotic workflow, the form could aggregate the input and generate an event to some other element, or publish a message to a web-worker.





To achieve this view of form validation, a single library must meet a variety of concerns.







## Semantic





Validation markup should describe the expected data as fully as possible. Semantic descriptions of data should be as consistent as possible, ensuring a consistent and quality experience across the forms on the domain.





  ### HTML5 Native





The HTML5 specification provides a wealth of expressive form and validation features. HTML4 forms not served as strict XHTML are able to access these attributes programmatically. Any implementation should at least look to the design decisions made by the HTML5 working group.



  ### Settings in markup





Any validation settings, including rules and error behavior, should be described as close to the input field as possible, preferably as an attribute directly. Localization and internationalization may require settings stored in alternative locations, in which case the l10n and i18n keys should be as close to the element as possible.



  ### Error markup





The markup rendering errors and notifications should have semantic descriptions, probably achieved with specific classes. Browser support for pseudo-selectors would also be an excellent hook for designers to use.



  ### Form & field





Validation rules will apply both to input fields individually, as well as to groups of input fields and forms as a whole. The library needs a mechanism to support business logic at any level of field aggregation. For instance, a form may need to ask for multiple email addresses. A component could be built around a `<ul>` and adding `<li><input type="email" name="to[]" class="distinct" />` for every new email address the user wishes to add. Each input must contain a valid email address, and the `<ul>` as a whole should guarantee that each address in the `to[]` array is unique.





## Aspect





Form validation is a cross-cutting concern. Form code should not need to take any actions beyond describing the validation rules (in as little code as possible). The validation tools should apply without further intervention to any form and form element available.





  ### Applies with no intervention





Including the code on a page should be the most intervention necessary by client code. If the validation library is part of the browser itself, purely semantic html/css forms will work with no developer intervention (though library extensions may still be necessary to bridge incompatible or incomplete implementations).



  ### Hooks to sensible events





There are places where forms' business logic will need additional or non-standard logic given its data descriptions. While the validation library should attach to forms automatically, it should also provide appropriate events and hooks for forms to extend additional behaviors. Further, some forms libraries may attempt to make disparate user agents behave consistently; in this case, the library must provide a common event interface across implementations.





## Non-invasive





As validation logic gets applied cross-cuttingly, it is imperative the library not cause render, layout, page-reflow, and other errors.





  ### Doesn't change page flow





Under no circumstances can the validation library cause a page reflow under normal CSS conditions. Any elements added to the page must be given a default style removing them from page flow. Any classes added should be well-described, and chosen to minimize the chance of conflicting with other common class names.





    ### Float with arrow





HTML5 browsers have independently adopted the convention of a floating div with an arrow pointing at the input element.





  ### Doesn't interupt the user





Validation should not occur while the user is actively providing input. In particular, if an element has focus validation should wait until absolutely certain the user is done inputting data to display validation errors. In a similar vein, if a user is rapidly jumping between fields, validation should not display errors in a way allowing users to miss the prompts.



  ### Page data must remain visible





Validation error messages should not cover page content, unless the validation message explicitly replaces that information.





## Extensible





Forms will need to have business logic that does not fit in the default configuration of any particular validation library. The default error messages may not correctly describe the validation concern with the form.





  ### Add, override validator functions





Some validation functions may be incorrect. Forms may wish to constrain a URL to only accept `ftp:` connections. Emails may want to restrict to a certain mail domain. In any of these cases, the form will need to either add additional rules, or override the default rules.



  ### Configure errors





The default errors will not describe every error of some class. A form may wish to tell a user that not only is the email invalid, it must be in a certain domain.



  ### Markup, messages, settings





Form designers demand as much control as possible. Business analysts will want to tweak and localize error messages. Developers will need to edit some default settings at some point. These should all be trivially easy to override piecemeal, as needed.








## Current solutions





There are several libraries and tools today meeting some of these concerns.





### HTML5 Form Validation





HTML5 has a variety of validation features in place and implemented by the newer browsers. The specification covers what is likely to be 90% of the validation criteria in a fully standards compliant way (no more need to implement a grammar recognizing RFCs 5321 and 5322). Any additional rules can be added by a javascript library, focused on adding only the small subset of features a particular forms application needs.





_[Usage](http://www.alistapart.com/articles/forward-thinking-form-validation/)_





This article from A List Apart is a fantastic discussion of ways to control validation using almost purely CSS.





_[Shim](https://github.com/ryanseddon/H5F)_





A shim for HTML4 browsers adding most of the utilities now provided by HTML5 browsers. Has some flaws:







  * Doesn't fall back on native implementation


  * Pseudo-selectors don't work for CSS2.





_[More discussion](http://stephenwalther.com/archive/2012/03/13/html5-form-validation.aspx)_





Another article, with some intriguing uses of `title` and `x-moz-errormessage` attributes.





### jQuery plugin





The bassistance jQuery plugin has become the de-facto standard jQuery validation library. It provides nearly every feature and meets all the concerns mentioned here, though is not as strictly focused as a pure HTML5 solution might be.





_[Article](http://bassistance.de/jquery-plugins/jquery-plugin-validation/)_





The original discussion, highlighting its usefulness at meeting the criteria for a robust validation library. Claims "Most used validation library."





_[GitHub](https://github.com/jzaefferer/jquery-validation)_





Github repo for the project.





_[jQuery Plugin](http://docs.jquery.com/Plugins/Validation)_





jQuery.com plugin page.




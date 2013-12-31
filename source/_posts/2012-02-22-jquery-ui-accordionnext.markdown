---
author: admin
comments: true
date: 2012-02-22 20:24:19+00:00
layout: post
slug: jquery-ui-accordionnext
title: 'jQuery UI: Accordion::next()'
wordpress_id: 280
categories:
- Technology
tags:
- accordion
- jquery
- jquery ui
---

I needed a "next" function to cycle between accordion panels in jQuery. The relevant [Stack Overflow question](http://stackoverflow.com/questions/1418202/jquery-accordion-next-and-previous-wizard-how-to-get-previous-and-next-section/) is a couple years old... :(

<!-- more -->

```javascript
$.extend($.ui.accordion.prototype, {
    next: function(){
        var index = this.option('active') || 0,
            next = index + 1,
        nodes = $(this.element).children('h3').length;
        if(next <= nodes && this.option('loopOnNext') === true) {
            next = 0;
        }

        return this.activate(next);
    }
});
```
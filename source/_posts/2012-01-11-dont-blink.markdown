---
author: admin
comments: true
date: 2012-01-11 19:35:52+00:00
layout: post
slug: dont-blink
title: Don't Blink!
wordpress_id: 271
categories:
- Technology
---

Since `<blink>` and `text-decoration: blink;` don't work in Webkit or IE9...

[css]
.invisible {
    visibility: hidden;    }
[/css]
[javascript]
$.fn.blink = function(){
    setInterval($.proxy(function() {
        this.each(function() {
            $(this).toggleClass('invisible');
        });
    }, this), 500);
};
[/javascript]
[javascript]
$('a').blink();
[/javascript]

<!-- more -->
Try it!



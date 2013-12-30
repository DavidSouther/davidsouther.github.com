---
author: admin
comments: true
date: 2011-11-06 18:06:26+00:00
layout: post
slug: jquery-icons
title: jQuery Icons
wordpress_id: 243
categories:
- Technology
tags:
- icons
- jquery
- jquery ui
- jquery ui icon
---

I'm playing around with jQuery UI themes. I need to get icon packs, and it's a long process to set the colors in themeroller, download the entire theme, extract the icons from the zip file, and put them in the site. wget to the rescue.

```bash
COLOR="000000"
wget -O "ui-icons_${COLOR}_256x240.png" "http://jqueryui.com/themeroller/images/?new=${COLOR}&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png"
```
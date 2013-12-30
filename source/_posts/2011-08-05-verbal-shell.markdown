---
author: admin
comments: true
date: 2011-08-05 08:36:48+00:00
layout: post
slug: verbal-shell
title: Verbal Shell
wordpress_id: 30
categories:
- Technology
tags:
- glados
- jarvis
- shell
- voice
---

I think it's time for an attempt at an auditory shell, a la Star Trek: The Next Generation.

"Computer&lt;pause&gt;" - The shell knows the next phrase is going to be a command for it, not background conversation

"What is the current accepted value of the gravitational constant?"
"The value of the gravitational constant is six point six seven times ten to the negative eleventh Newton square meters per kilogram squared." ([http://www.wolframalpha.com/input/?i=+What+is+the+current+accepted+value+of+the+gravitational+constant%3F](http://www.wolframalpha.com/input/?i=+What+is+the+current+accepted+value+of+the+gravitational+constant%3F))

"Computer, what is the current disk usage of my home folder?"
"Your home folder, dev es dee aye four, is using forty-four percent of the available seven-hundred ninety-four gigabytes."
(`$ df | grep /home
/dev/sda4 ext4 794G 327G 428G 44% /home`)

Yes, a **lot** of work with NLP, but with the right suggestions library, I think it would be possible to create a wrapper that includes hooks to WolframAlpha, CoreUtils, and some of the open desktop specifications (notification tray? knowledge of .desktop files, so I can "Computer, Open Skype), and an API for programs to supply their own hooks

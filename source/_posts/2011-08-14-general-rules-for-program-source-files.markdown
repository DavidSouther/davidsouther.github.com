---
author: admin
comments: true
date: 2011-08-14 03:55:32+00:00
layout: post
slug: general-rules-for-program-source-files
title: General Rules for Program Source Files
wordpress_id: 107
categories:
- Coding Standards
- Technology
tags:
- coding
- standards
- style guidelines
---

### General





	
  * Do not wrap lines of code.


	
    * If a line starts getting longer than 79 characters, it should be refactored.


	
      * Narrow screens are still not uncommon. Many programmers have toolbars and other windows taking up the sides of the screen. The human field of vision still needs to scan vertically. 80 is still the magic number for line width.



	
  * Wrap lines of comments at the 79th column

	
  * Always break comment lines on a space, don’t hyphenate by hand.




### File Format





	
  * Files should be saved with Unicode (UTF-8) encoding.


	
    * It just works well, and most tools expect and handle UTF-8 well.

	
    * The BOM should not be used.


	
  * Unix line endings should be used (LF, \n).


	
    * Most source control tools expect, and greatly prefer, Unix line endings.




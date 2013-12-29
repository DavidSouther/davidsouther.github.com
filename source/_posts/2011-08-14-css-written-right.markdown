---
author: admin
comments: true
date: 2011-08-14 04:10:47+00:00
layout: post
slug: css-written-right
title: CSS Written Right
wordpress_id: 115
categories:
- Coding Standards
- Technology
tags:
- coding
- css
- standards
- style guidelines
---

I have never seen a large CSS file that I thought was maintainable. In programming languages, we use indentation exhaustively to provide visual cues of related blocks of code. Unfortunately, CSS is often a giant wall of text, with all selectors at col 0 and all properties starting 1 tab deep. Instead, CSS blocks should be indented based on their selector’s expressiveness. In the example, we have body, a, and .content-wrapper all at the same level. Then, we indent .content-wrapper h1 one extra level, visually demarcating it as subordinate to .content-wrapper. In large CSS files, not only does this make it much easier to quickly scroll code, it discourages excessively deep selectors, encouraging designers to be more descriptive and accurate.
<!-- more -->


### Example


[css]
body {
	font:bold 12px Arial, Helvetica, sans-serif;
	color: #333;	}


a {
	text-decoration:none;	}


	a:hover {
		color:#000;	}


.content-wrapper {
	width:850px;	}

	.content-wrapper h1 {
		padding-left: 22px;	}

	.content-wrapper p {
		background:none;
		color:#44b5df;
		font-weight:normal;
		padding-top:10px;
		padding-left:0;	}

		.content-wrapper p em {
			background-color: #ffffde	}

	.content-wrapper > div {
		float:left;
		margin: 0 0 0 5%;
		width: 45%;
		padding:0 0 20px 0;
		border-bottom:dashed 1px #CCC;	}
[/css]
(There should be another new line between selector rule blocks- I'm not sure why the code view isn't working :()



### Rules





	
  * Dashes between words, NOT camel cased

	
    * See section in HTML about ids for why.




	
  * Reset style condensed as much as possible.

	
    * [http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/)




	
  * Eliminate redundancy

	
    * Move inherited declarations up in the cascade




	
  * Blocks indented by specificity

	
    * .about-scanning has no indentation, .about-scanning h1 is one level deep




	
  * Selectors on one line with brace { at end of line

	
  * Properties one per line

	
  * Closing brace } one tab past last property

	
  * Always use short-hand properties (font, margin, padding)

	
  * Layout sizes in em or %

	
    * Creating flexible layouts is a good thing.




	
  * px for specific images

	
  * Use any [selectors](http://www.w3.org/TR/CSS2/selector.html)necessary, but know them all.

	
    * [> for children](http://www.w3.org/TR/CSS2/selector.html#child-selectors)

	
    * [+ for siblings](http://www.w3.org/TR/CSS2/selector.html#adjacent-selectors)

	
    * etc




	
  * Use comments /* ... */ liberally to describe the purpose of rules, or the intended effect




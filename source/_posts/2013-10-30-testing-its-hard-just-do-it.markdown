---
author: admin
comments: true
date: 2013-10-30 17:31:11+00:00
layout: post
slug: testing-its-hard-just-do-it
title: Testing. It's hard. Just Do It!
wordpress_id: 560
categories:
- Technology
---

["With enough eyeballs, all bugs are shallow."](http://en.wikipedia.org/wiki/Linus's_Law)


The bug might be shallow when it's first found, but how does it never happen again? Automated Testing. When a bug is found, prove it exists with a test. Then, that bug is guaranteed to never happen again - a little computer gremlin with eagle-eye focus will look at that bug every time your program runs, and the bug will NEVER HAPPEN AGAIN. It will never happen, because if you come close to making that bug, the gremlin will make your console bleed with the red of a failed test.


> "The three chief virtues of a programmer are: Laziness, Impatience and Hubris."
> - Larry Wall (creator of Perl)


That little gremlin I wrote to prove the (non)existence of a bug? That's me being lazy. I have absolutely zero desire to fix a bug a second time - that's time I could be playing ping pong, or writing a new operating system. That little gremlin better be fast, too, or I'm not going to wait around for him. The gremlin must be small and focused, with a family of small, focused gremlins that can run all my critical tests (the features I'm touching) in under 5 seconds, and my entire codebase quickly enough to not block anyone else on my team ([or they will not test, because it takes too long to be useful](http://codeascraft.com/2013/09/23/lxc-running-14000-tests-per-day-and-beyond-part-1/)). My code always works correctly, the first time. At least, it does every time I write a test before I write a feature. I know most developers aren't as egotistical as I am, but I don't know a single good developer who doesn't want to take pride in the code they've written. It's damned easy to take pride in code that Works Right.

## Why don't I test more often?


![](https://lh3.googleusercontent.com/OkcCl_KVOvD6J7q4w_mWsgvj01mc_3jqS_fKcKIZbJDqq5HMCoPE0J2fnJld_XA9Zxs21XSH429Rnwk9V-T_MHB19-Wk090pYtvHD0pGOUdf_QKls6HXaX-dUA)


Testing is hard. It's not the way most programmers learned to program. The other side of the laziness sword? If it's easier to take a shortcut, to get code out the door, I probably will. Testing is in many cases as hard as writing production code, but for a completely different reason: testing requires discipline. Discipline is not, in my experience, something prided by the great hackers of our field. It is a completely different way to approach building software, and requires an equal level of commitment and experience to become comfortable for a developer or team. Without that discipline, shortcuts will happen, and developers won't write code.

Three things need to happen when a team gets to that point. The tests need to be easier to write. This is half experience and half toolkit - the test suite must be fast to run and easy to add tests, and I personally need to be familiar enough with the testing library to write the tests. The test suite must run, and pass, before any code is allowed out the door (coverage testing will guarantee a level of certainty that tests have indeed been written). The third and equally critical piece is support from the project's leadership. If the leadership of the team allows developers to slide and be (bad) lazy, testing will slip.

### Metaphorical Interlude

<pre>
           Drawing from a well,

       Deep and full and crystal clear.

         A ratchet won't slip.
</pre>

![](https://lh4.googleusercontent.com/4dgJC56kg--PvW2NHWSTtKr6H0RbQHFAi4pKitQOyUhOBT0KgAyX_Yau1efUdBnI4USrPk63-KEBB9Twrd-yRK8nN_yevJLYOpOullHdpi0hmpdHQgblbjwQYw)Programming is like drawing water from a well. When the well is shallow, and the bucket small, it's not too difficult a task. When the bucket is big, and the well deep, it becomes harder to draw the bucket, and every mistake can be more disastrous. Automated testing is like installing a ratchet on the rope - every time you write tested code, that bit of rope will never slip. Embracing test driven development is installing a pulley to hoist the bucket with the program. The force and exertion to write a feature halves, because you only write the actual half of the feature the customer needs.


## Excoriation of Excuses

If you're a programmer and you don't write tests, I'm going to assume you don't care enough about your code. I'm going to assume that the code you're working on, you're fine with it being 80%. I'm going to assume you are smarter than me, in a bad way. I am not smart enough to know whether I did or did not break the code you wrote, if I don't have a test suite that tells me if I broke it or not. I am probably not going to want to work on your project or component. I say this not because I think less of you, or want to belittle you, but because this is as much a wake-up call to myself. I say this to myself when I visit old code of my own, that I wrote without tests. It is disgusting and reprehensible to visit those code bases, and I have no desire to return to those projects, no matter how well intentioned they were.

If you're a manager and don't demand your team writes tests, I'm going to assume you're penny-wise and pound-foolish. If your project is doing well now, I will put money on it collapsing with a bit of churn in your team. After about a quarter of your team has moved on or been replaced, your codebase will collapse into a mess of hard to find bugs, weird edge cases, and increasingly continued pressure to deliver new features when your team is simply unable to write a line of code that doesn't unexpectedly change behavior elsewhere in the application. I will not volunteer for your team. Similarly, if I ever find myself leading a team in such a position, I would be incredibly reticent to hire a developer willing to work in my environment. (Unless, of course, I am being hired or hiring a [Software Engineer in Test](https://www.google.com/about/jobs/search/#!t=jo&jid=35182&) specifically to fix these testing deficiencies.)

## Prototypes, Too!

[![Evils of the Refactoring Cat](http://davidsouther.com/wp-content/uploads/2013/10/post-10513-Code-Refactoring-Cat-in-Bathtu-yRZT.gif)](http://davidsouther.com/wp-content/uploads/2013/10/post-10513-Code-Refactoring-Cat-in-Bathtu-yRZT.gif)I reject the concept of one-off code. If you're at a hackathon, there is that point, about three hours before demo, where your project is AWESOME, and going to win best of show, but you have three hours so you might as well implement a new feature. Without tests, your demo will fail. You will accidentally, in the heat of the moment, break the old, MVP feature with that whiz-bang animation, and have no idea how to get back. At best, you will have a commit to roll back to. At worst, your hackathon time was ruined. With a prototype, you are trying to convince someone to go out of their way to do you a favor. Don't play the lottery - write tests.

## Call to Action

At this point, it should be pretty clear I care, very deeply, about code and code quality. I want to use good software, and I want to write good software. Help me! If you write code, find a way to test! Challenge me! Don't let me off the hook when testing gets hard, and I won't let you! Together we can craft better software!

### Some resources for getting on the testing train:

  * [I Pity the Fool](http://www.codinghorror.com/blog/2006/07/i-pity-the-fool-who-doesnt-write-unit-tests.html)
  * [Working Effectively with Legacy Code](http://www.amazon.com/exec/obidos/ISBN=0131177052/portlandpatternrA/) - [Intro PDF](http://www.objectmentor.com/resources/articles/WorkingEffectivelyWithLegacyCode.pdf)
  * [Unit Testing 101: Are you testing your javascript?](http://msdn.microsoft.com/en-us/magazine/gg655487.aspx)
  * [Obey the Testing Goat](http://www.obeythetestinggoat.com/)

---
author: admin
comments: true
date: 2012-12-07 15:13:24+00:00
layout: post
slug: observers-in-my-syntax
title: Observers? In *my* syntax?
wordpress_id: 491
categories:
- Technology
tags:
- eventing
- livescript
- observers
---

Modern graphical programming is dependent on the [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern). Its use in Model-View-Controller architectures vaulted the pattern into widespread use. Its continues to find applicability in event and interrupt based systems. The underlying conceptual pattern is astounding. In traditional APIs, the user is allowed to call library code arbitrarily, but there is no mechanism for a library to call user space code. While this is somewhat obviated by extensive callback usage, having formally defined and documented locations where library code calls user code is a great boon in large-scale software architectures. The observer pattern provides such a mechanism. In short, observers are great. How can they be worked even tighter into a coding environment?

<!-- more -->

This past year has seen an abundance of metamorphic languages targeting JavaScript. [LiveScript](http://gkz.github.com/LiveScript/) especially has added a glut of incredibly useful syntax to CoffeeScript, borrowing heavily from Haskell. These improvements capture, in concise syntax, a myriad of concepts that normally take many lines of code. Users of the LiveScript language have access to functional currying, piping, backcalls, and dozens of other operations resulting in less typing and more straightforward programs. The results of these symbols occur in a myriad of ways- some are converted into appropriate JavaScript, while others are handled by introducing hidden functions to introduce the new features. The two mechanisms both work well and in tandem, allowing nearly any combination of additional language features.





I would like to add a series of operations for handling observers in a language's syntax. The operations I propose have been implemented in a [fork](http://gkz.github.com/LiveScript/) of LiveScript, and used to great effect in several programs compiled with the fork.





The three symbols are


  * `:>` Observe
  * `-:>` Unobserve
  * `<:` Trigger

Each is a binary operation, taking on its left hand side a reference to some event, and on its right hand side either a function reference (for observe and unobserve) or a value (for trigger). Events in this syntax are simply properties on an object. Specifically, the left hand side can be a reference to any object, with the right-most property being the property and its container being the scope of the event. In practice:




    
```
source = {}
pass = false
source :> !(e) -> pass := e
source <: true
ok pass
```





Here, `source` itself is the event. It has a single observer, which sets the global value of `pass` to the value that `source` was triggered with. Another example:




    
```
/* "Observers and Advisors trigger in correct deep context" */
source = {}
source.child = new ->
    @pass = 0
    this

add = !-> @pass++
source.child.event :> add
source.child.event <: {}
equal source.child.pass, 1
```

Here, the object `source` has a single `child` with some `event`. When `event` is triggered, the observers are called with `this` bound to `source.child`, one level up from the event property.

Having these operators is a huge boon in writing event-driven programs. Not only does the codified syntax mean less typing, it provides a clear visual symbol for the concept of observing and triggering a variable. The actual implementation of the eventing is abstracted behind whatever event library the compiler chooses to delegate to. In my original implementation, the event listeners are attached to an array on the event itself, but another library could make the event property a function, a la jQuery, or register it in a private list of event sources, a la string-keyed pub/sub libraries.

My branch is available at [github.com/DavidSouther/LiveScript](http://github.com/DavidSouther/LiveScript). I intend to rewrite the eventing library used in two places. First, it should compile to a known method signature, with options on whether to include the function definition in the compiled scope. This will allow the eventing implementation to decouple from the compiler. Second, I would like to rework the implementation to detect if the event source is a function. This will allow the syntax to handle jQuery events natively.

I would ask [gkz](https://github.com/gkz) and other users of LiveScript to consider this approach to an eventing syntax.

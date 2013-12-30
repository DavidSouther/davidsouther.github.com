---
author: admin
comments: true
date: 2011-06-10 22:01:54+00:00
layout: post
slug: jmtt-jquery-minimal-tree-table
title: jmtt - jQuery Minimal Tree Table
wordpress_id: 57
categories:
- Technology
tags:
- jmtt
- jquery
- jquery ui
---

My dad mentioned an interesting project to me the other day, posing the challenge of coming up with an interface for examining deep rubrics for grading classes, or businesses, or anything that needs a grade. The idea is that you have a tree of different aspects that go into an overall grade. The interface needs to show this tree breakdown, while showing several controls with each item in the list. In short, the interface needs a [Tree Table](http://designinginterfaces.com/firstedition/index.php?page=Tree-Table).

**[See jmtt in action!](http://davidsouther.com/projects/jmtt/tree.html)**

There are a few treetable components out there ([Swing](http://java.sun.com/products/jfc/tsc/articles/treetable1/), [Qt](http://doc.qt.nokia.com/4.7-snapshot/qtreewidget.html), [ASP.NET](http://www.codeproject.com/KB/aspnet/ASPNET_TreeView_using_C_.aspx)), but I wanted to do this in jQuery. Because jQuery is the bees knees, and distributing apps purely in the browser is something I've been working towards. With that in mind, the design goal is that the application would be a single folder, completely self contained, and run by opening a .html file. Not being one to reinvent the wheel, I took a look at what plugins there were and found [treeTable](http://ludo.cubicphuse.nl/jquery-plugins/treeTable/doc/) and [JQTreeTable](http://www.hanpau.com/index.php?page=jqtreetable). Unfortunately, both are terrible. The HTML needed is horribly, disgustingly unsemantic. treeTable uses class and id attributes of the tr tags, and JQTreeTable has you pass in a map of child to parent ids. BLECH! Having to add an id to every row, and then ask a designer to follow that? NO!

So, I wrote my own. The guiding, number one goal was a semantic markup- the list hierarchy *MUST* be conveyed using a ul/li structure. Beyond that, the plugin should be as configurable as possible, while using as clean a plugin architecture as possible. Since this was my first trip around the jQuery ui block, I found bililite.com's [jQuery UI Widget tutorial](http://bililite.com/blog/understanding-jquery-ui-widgets-a-tutorial/) an invaluable resource.

```html
<ul id="tree">
    <li class="head">
        <span class="aspect">Aspect</span><span class="weight">Weight</span><span class="grade">Grade</span><span class="cost"/>Cost</span><span class="value"/>G/$</span>
    </li>
    <li>
        <span>Software Develoment</span><span>70%</span><span></span>
        <ul>
            <li>
                <span>Design</span><span>30%</span><span></span>
                <ul>
                    <li>
                        <span>Requirements</span><span>33%</span><span>85</span><span>30</span>
                    </li>
                    <li>
                        <span>Mockups</span><span>33%</span><span>90</span><span>5</span>
                    </li>
                    <li>
                        <span>Planning</span><span>33%</span><span>60</span><span>50</span>
                    </li>
                </ul>
            </li>
            <li>
                <span>Development</span><span>50%</span><span>80</span><span>70</span>
            </li>
            <li>
                <span>QA</span><span>20%</span><span>50</span><span>100</span>
            </li>
        </ul>
    </li>
    <li>
        <span>Marketing</span><span>30%</span><span></span>
        <ul>
            <li>
                <span>Online</span><span>45%</span><span>85</span><span>10</span>
            </li>
            <li>
                <span>Print</span><span>35%</span><span>60</span><span>25</span>
            </li>
            <li>
                <span>Radio</span><span>25%</span><span>75</span><span>15</span>
            </li>
        </ul>
    </li>
</ul>
```

Pretty minimal, isn't it? The API is exposed through triggers, in a very functional way. Extending is easy, as show in the full demo. The code is available at [http://code.google.com/p/jmtt/](http://code.google.com/p/jmtt/) under an lgpl license. For bonus points, the columns are resizable.

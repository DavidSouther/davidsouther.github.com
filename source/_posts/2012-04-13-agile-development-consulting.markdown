---
author: admin
comments: true
date: 2012-04-13 13:03:39+00:00
layout: post
slug: agile-development-consulting
title: Agile Development Consulting
wordpress_id: 248
categories:
- Technology
tags:
- agile
- client relations
- consulting
- continuous integration
---

_This is an open letter from me to nearly any potential client. The client and I have talked for a few emails, and I have just read an email asking me to spend 4 to 8 hours in a meeting working to detail every single piece of their software project for the next 6 months, with the expectation that in 6 months we would get back together and they will have a complete, perfect piece of software. In my reply, I try to convince them of an agile approach to development._

Let's take a moment to talk about software development projects. In your email, you describe the Big Design Up Front (BDUF) approach to building projects. Everyone gets together for a meeting or two at the beginning of the project, sits down, and writes a document that describes in excruciating detail what every person in the implementation team will be doing for the rest of the project. This is necessary for buildings, for two reasons. First, it is very expensive to get half way through a project and realize that instead of a skyscraper, the owner actually needs a factory. This is even more exacerbated in software, because the medium is so abstract. Second, it is really hard to predict the future, which is what BDUF does. How can I say, "On the 3rd of January, 2012, David will spend exactly 2 hours building form 34-A"? We can't.

<!-- more -->

The alternative is Just Enough Design Up Front (JEDUF). This approach says "We don't know exactly what's going to happen in two months, but we actually do have a pretty good idea of where we want to be." In this alternative, we embrace and expect flexibility. In the "Scope, Resources, Schedule" triple constraint, we fix the resources and schedule, and allow the scope to change as needed. This sounds troubling in theory, but in fact turns out to work very well in practice. There is a wealth of literature showing Agile projects have better productivity, lower costs, and overall higher stakeholder satisfaction than their traditional counterparts. Let me walk you through the overall approach to agile project management, and I think you'll see how this is achieved.

At the start of the project, we get together and create user stories. User stories describe the features we need in the project, irrespective of how those are actually achieved. Once we have these user stories, you, the product owner, prioritize them. This becomes what we call the Product Backlog. These are all the things you want the software to do, but it doesn't yet do. At any time, you can add things to the product backlog, re-prioritize the backlog, take things off, whatever. It's your list, describing your vision of the completed project. Notice that there is no specific plan on how to achieve the vision- just what you want done, listed in the order of importance. "As a registered user, I can expect my account to be locked after three failed logins so that my account remains secure" and "As a Teller I want to be able to find clients by last name, so that I can find their profile faster" are good examples of user stories. A user story has a well-defined format: "As a (type of user), I want to (overview of a feature), so that I can (why the feature is needed)." This gives us the scope details we can use later in the project.

Once we have these user stories, the development team (me, in this case) assigns each user story an estimate in story points. This estimate is very abstract- it is not a time estimate, nor is it a commitment. It is just a number that describes roughly how big each story is, relative to other user stories. If a user story is too large, we will go back through and break it into smaller user stories grouped as a theme, until we have a rich collection of discrete user stories. Once we have this collection, and it's time to start a sprint, the development team will take some of those stories for the sprint backlog. The sprint backlog is the list of things we expect to be able to complete in a sprint. To choose which stories to do in a sprint, we start at the top of the product backlog and pull user stories until the total estimate for those stories is the same as we estimate our ability to complete in a sprint. This number is not set willie-nillie, but is calculated as a velocity based on what was completed during previous sprints. At the end of the sprint, we look at all the stories we completed, add that number up, and calculate a velocity in story points per sprint. This number becomes a highly accurate descriptor of what the team will achieve in each sprint.

At the end of the sprint, every user story is either completed or not. There is no 30% done, nor "almost there" - it either works, or it doesn't. To do this, we need well-defined acceptance criteria at the beginning of each sprint. This ensures you know exactly what to expect at the end of the sprint, and I know exactly what I'm building. As much as possible we want these acceptance criteria to be automatically testable, or at least up to as little debate as possible. At the end of the sprint, we also look at how much was promised (story points from the product backlog) and how much was delivered. That ratio describes the percentage of possible discount. This continual delivery is a key benefit of an agile approach vs the more traditional approach, when the development team goes away for a month or three, and you have no idea what will come out. Instead, we have continual communication to make sure we are on the same page, and you can see the software as it is created in order to meet changing requirements, changing business goals, and in order to have more flexibility in general.

I cannot stress enough how important continual delivery is in this practice. I have seen too many software projects start with the best intentions, only for their development teams to disappear for days, weeks, or even months before coming back with a piece of software that not only doesn't function, but no longer has any similarity to what the client envisioned. Instead, with continuous integration, the client always knows exactly where their project is. There is never a misunderstanding of what is currently on the table- the software is available and speaks for itself. With continuous integration, you can walk away at any time. If (and this will not happen with me) you ever feel the project is not going in the direction you want, you can cut your losses and take the current working software and take it to any other developer you want to continue your project. That is just some of the value of an agile approach with continuous integration.

I've gone on for a thousand words now, but I'd like to say one last thing. I am so convinced of the quality of this approach to software that I will give you the first sprint's work for free, and the second sprint for half price. I want to do this project with you, and I know you will like my work so much that I am willing to give 3 weeks of my time to prove how well this process works, and to prove the quality of my work.

Sincerely Yours,

David Souther

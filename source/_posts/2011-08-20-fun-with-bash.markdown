---
author: admin
comments: true
date: 2011-08-20 21:31:56+00:00
layout: post
slug: fun-with-bash
title: Fun with Bash
wordpress_id: 172
categories:
- Technology
tags:
- bash
- bkvs
- forensics
- history
- Loccard's Principle
- unix
---

I freakin love bash. The thing's amazing, with some ridiculous language constructs that even perl can't dream of. If the unix philosophy is "one task, one tool," Bash's task is glue.

I've been using it over the past week on a digital forensics case. This is a project that involves examining a dozen production hard disks for any artifacts of inappropriate or malicious use (hacking, malware, unauthorized websites, breach of data policy, etc etc). The disks I'm analyzing are about 120GB a piece, dual-boot between Windows XP and various linux distros. After some initial analysis, we have 3 data partitions per disk, and somewhere between 300 and 400 thousand artifacts per partition. That's over 10 million artifacts to collect and analyse, from 12 different physical devices. This is for a court case, so rules of evidence and expert witness rules apply- notes. Lots and lots of meticulous notes. Guess what? Bash makes it easy.

To start off, I only actually had two physical devices to work from. Following consequences of [Locard's principle](http://en.wikipedia.org/wiki/Locard's_exchange_principle), the original devices were raw copied (`dd`ed) to a pair of aggregate drives. These aggregates then had a single file system with a handful of .raw files each. That's where we start from. Here are the tools I've added to my belt (and `.bashrc`).


### bkvs


[bkvs](http://davidsouther.com/2011/08/bkvs-bash-keyvalue-store/) is a little script I wrote that abstracts the file system into a key/value pair. It handles directory creation, file management, and generally keeps things from breaking. You'll see me using it several times, so it might help to read the man page, but generally, it supports `get(key`), `set(key, value)`, `add(key, value)` and `delete(key)`.


### history -a


[history](http://ss64.com/bash/history.html) can append the current session to a file. Better yet, it only prints the history that's happened since the last time it was written. This makes it really easy to play around with a few commands, get the syntax right, save the history to your notes, clean it up, and then move on with the next step.


### Intermediate Scripts


Because of the similarity in naming conventions and the tasks I'm doing on each individual drive, I'll need to run the same command on several different partitions. xargs is built exactly for this. Or so it thinks. Actually, xargs is for running a single command inside a pipeline. I need to run several different pipelines, and building those pipes in xargs would be tricky, I think. Further, xargs could have a subtly different invocation each time it gets put in a pipe, and I don't know exactly what the command line expanded to. xargs also can't easily build a pipeline of Instead, I've started using intermediate shell scripts. In general, I'll have a loop or pipeline that has variables bound and delimited fields in the pipe, and use awk to construct the command line I'd want to run. Then, instead of executing it immediately, I wrap the entire looped pip in braces, and redirect that output to an intermediate script.

```bash
{
for drive in $(bkvs get drives)
do
bkvs get $drive/offsets | fgrep NTFS | awk "{print \"log2timeline -p -r -f winxp bkvs/$drive/\" \$1 \" | bkvs add $drive/\" \$1 \".timeline\"}"
done
} >| mount_timelines.sh
```

This builds a nice script that looks very regular:

```bash
log2timeline -p -r -f winxp bkvs/6HD1/6HD1.raw2 | bkvs add 6HD1/6HD1.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD2/6HD2.raw2 | bkvs add 6HD2/6HD2.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD2/6HD2.raw5 | bkvs add 6HD2/6HD2.raw5.timeline
log2timeline -p -r -f winxp bkvs/6HD3/6HD3.raw2 | bkvs add 6HD3/6HD3.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD4/6HD4.raw1 | bkvs add 6HD4/6HD4.raw1.timeline
log2timeline -p -r -f winxp bkvs/6HD5/6HD5.raw1 | bkvs add 6HD5/6HD5.raw1.timeline
log2timeline -p -r -f winxp bkvs/6HD5/6HD5.raw2 | bkvs add 6HD5/6HD5.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD6/6HD6.raw2 | bkvs add 6HD6/6HD6.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD7/6HD7.raw2 | bkvs add 6HD7/6HD7.raw2.timeline
log2timeline -p -r -f winxp bkvs/6HD8/6HD8.raw2 | bkvs add 6HD8/6HD8.raw2.timeline
```

### Paralyze


What I actually mean is parallelize, but I always miss a syllable. I want to run this script now, but log2timeline takes a significant chunk of time. I'm a guy who's proud of his quad-core processor, and who's done his share of OpenMP and parallelization, so it'd be nice to have a way to get my load up around 3.5, instead of the measly 0.1 it usually sits at. I've added this handy little function to my bashrc.

```bash
alias ding='echo "Done" | mail davidsouther@gmail.com'
function paralyze() {
	file=$1
	tmp="$file._tmp"
	cat "$file" | awk '{print "{ " $0 "} &"}' | sed 'n;n;s/&$//' | sed '$s/&$//' >| $tmp
	nice -n 10 sh $tmp >$file.log 2>$file.log.error
	rm $tmp
	ding
}
```

It takes a single parameter, a bash script in a similar format (one command per line). It adds an ampersand (&) to the end of every line (to background it), and then removes the & from every 3rd line. (Experimentation might show a better number, but I chose p-1 as an ideal of every core having 1 perfect, non-blocking process just running on its own, leaving a core for my desktop). Last it removes the last line's &, so the last line will always block until the end. This gets put in a tmp file, since each line is supposed to be completely independent from every other line. Finally, we run the tmp file as a shell script, niced down low so it doesn't start thrashing, and redirect stdout and stderr to some log files. When it's done, it cleans up, and emails me.

There are a couple issues. First, there's no guarantee that every third line will finish after the lines above it, or that the last line will also finish last. But, without writing some accounting mechanism to watch the current process list, it does a pretty damned good job of letting me run a lot of parallel tasks in the background, without having to monitor them by hand.


### That's all for now


Those are the four little things I've picked up on using over the past couple days. Again, the requirements are meticulous notetaking, and automation of repetitive tasks. These little helpers have made my life tremendously easier (in fact, possible) compared to sitting around typing each `fdisk -l` and `mount` out by hand.


### Bonus


From Andrew Niemantsverdreit: (as root)

`strings /dev/mem | more`

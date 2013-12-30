---
author: admin
comments: true
date: 2011-08-19 08:30:49+00:00
layout: post
slug: bkvs-bash-keyvalue-store
title: bkvs - Bash Key/Value Store
wordpress_id: 163
categories:
- Technology
tags:
- bash
- key value store
- kvs
- nosql
---

I like me my associative arrays and key/value stores. They're really really useful. I wanted one in bash, and tada,

```bash
declare -A aa
aa[hello]=world
aa[ab]=cd
```

Well, I wanted something that could be used between sessions. Tada, the filesystem is a great key/value store.

I wrote a wrapper for the set ADT get(key), set(key, value) and delete(key) to the file system. It's available at [http://code.google.com/p/bkvs/](http://code.google.com/p/bkvs/) and makes for some pretty nice loops.

```bash
# get bkvs ready (http://code.google.com/p/bkvs/)
export PATH="$PATH:/home/southerd/devel/southerd/bkvs"
export BKVS_ROOTDIR=./bkvs

# Get and verify list of drives.
ls /media/project_drives/*raw | sed 's#/media/project_drives/##' | sed 's/.raw//' | bkvs set drives
#bkvs get drives | while read drive ; do echo $drive ; done

# Save the raw partition table for each drive
bkvs get drives | while read drive ; do fdisk -l /media/project_drives/${drive}.raw | bkvs set ${drive}/table ; done
sed -i 's/bkvs history notes //' bkvs/6HD*/table # Somehow the * for boot got expanded to "bkvs history notes"

# Get lists of the partition offsets
root=/media/project_drives/
for drive in $(bkvs get drives) ; do bkvs get $drive/table | egrep "^$root$drive" | sed "s#$root##" | awk '{print " " $1 " " $2 " " $3 " " $6}' | bkvs set $drive/offsets ; done

# Build the timelog of the headers
{ for drive in $(bkvs get drives) ; do bkvs get $drive/offsets | awk "{print \"icat -i raw -o \" \$2 \" $root$drive.raw 0 | bkvs set $drive/\" \$1 \".head\"}" ; done } >| icat_heads.sh
{ for drive in $(bkvs get drives) ; do bkvs get $drive/offsets | fgrep NTFS | awk "{print \"log2timeline -f mft -m \" \$1 \" bkvs/$drive/\" \$1 \".head | bkvs set $drive/\" \$1 \".log\"}" ; done } >| head_timelines.sh
sh icat_heads.sh >icat_heads.log 2>icat_heads.log.error
sh head_timelines.sh >head_timelines.log 2>head_timelines.log.error
```
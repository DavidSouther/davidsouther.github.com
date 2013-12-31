---
author: admin
comments: true
date: 2011-08-31 14:46:24+00:00
layout: post
slug: bash-strcmp-builtin
title: Bash strcmp builtin
wordpress_id: 204
---

I needed a way to lexicographically compare strings in a bash script. Unfortunately, test only test string equality. C's strcmp returns 0 if two strings are equal, or the index of where the strings differ (positive if the character is greater in the first string, negative if the character at that position is greater in the second string). For my purposes, I only needed to know which one was greater, not where it was greater at. I whipped up a quick version of the program in straight C, but immediately had problems with loading times being drastically heavier than computation times. This seemed like the perfect case for a bash loadable builtin. I hadn't worked with bash builtins before, but [bash cookbook](http://oreilly.com/catalog/9780596526788)'s recipe 16.15 is a guide on loadable builtins. This is one place where preparation is the larger part of luck. With that, here's a quick walkthrough of the code and compile process.

<!-- more -->

Start by donwloading and extracting the bash [source](http://ftp.gnu.org/gnu/bash/) ([latest is 4.2](http://ftp.gnu.org/gnu/bash/bash-4.2.tar.gz)). Extract the tarball. We are going to be working in a small part of the bash source tree, in the examples/loadables/ folder. cd there, then run the following commands:

```bash
cp template.c strcmp.c
sed -i 's/template/strcmp/g' strcmp.c
```

Before we run configure, we need to add strcmp to Makefile.in

```
--- a/examples/loadables/Makefile.in	2009-01-04 12:32:27.000000000 -0700
+++ b/examples/loadables/Makefile.in	2011-08-31 08:39:01.707126956 -0600
@@ -85,7 +85,7 @@

 ALLPROG = print truefalse sleep pushd finfo logname basename dirname \
 	  tty pathchk tee head mkdir rmdir printenv id whoami \
-	  uname sync push ln unlink cut realpath getconf strftime mypid
+	  uname sync push ln unlink cut realpath getconf strftime mypid strcmp
 OTHERPROG = necho hello cat

 all:	$(SHOBJ_STATUS)
@@ -191,6 +191,9 @@
 mypid:	mypid.o
 	$(SHOBJ_LD) $(SHOBJ_LDFLAGS) $(SHOBJ_XLDFLAGS) -o $@ mypid.o $(SHOBJ_LIBS)

+strcmp:	strcmp.o
+	$(SHOBJ_LD) $(SHOBJ_LDFLAGS) $(SHOBJ_XLDFLAGS) -o $@ strcmp.o $(SHOBJ_LIBS)
+
 # pushd is a special case.  We use the same source that the builtin version
 # uses, with special compilation options.
 #
@@ -242,3 +245,4 @@
 realpath.o: realpath.c
 strftime.o: strftime.c
 mypid.o: mypid.c
+strcmp.o: strcmp.c
```

First, take a moment to look at the bare strcmp.c - it has a lot of good stuff in it. That said, we're going to get rid of most of it.

```c
#include <config.h>
#include <stdio.h>
#include <string.h>

#include "builtins.h"
#include "shell.h"

#define EXIT_GREATER 1
#define EXIT_EQUAL 0
#define EXIT_LESS 2

strcmp_builtin (list)
WORD_LIST *list;
{
	char **v;
	int c, rval;

	v = (char**)make_builtin_argv(list, &c);

	if(c < 3)
		return (EX_USAGE);

	int q = strcmp(v[1], v[2]);
#ifdef DEBUG
	printf("q is %d\n", q);
#endif
	if(q > 0)
		rval = EXIT_GREATER;
	else if (q < 0)
		rval = EXIT_LESS;
	else
		rval = EXIT_EQUAL;

	return (rval);
}

char *strcmp_doc[] = {
	"strcmp compares two strings lexicographically. It returns",
	"0 if the strings are equal, 1 if the first string is greater",
	"2 if the second string is greater.",
	(char *)NULL
};

struct builtin strcmp_struct = {
	"strcmp", /* builtin name */
	strcmp_builtin, /* function implementing the builtin */
	BUILTIN_ENABLED, /* initial flags for builtin */
	strcmp_doc, /* array of long documentation strings. */
	"strcmp 'string 1' 'string 2'", /* usage synopsis; becomes short_doc */
	0 /* reserved for internal use */
};
```

There is one flag we might use, -DDEBUG to print debug info. Otherwise, we define our three exit statuses. Every builtin takes a WORD_LIST* as its arguments. I want a regular old argv array. Bash handily includes the make_builtin_argv for just that purpose. Now, argv[0] has the builtin name, and the rest of argv has the args. Make sure we have 3 args, run the strcmp, and set the appropriate return code. The rest is the support that bash needs to load everything.

Assuming the Makefile.in was edited correctly, cd to the root of the bash source tree and run ./configure. Then, cd back to examples/loadables, and run the following session:

```bash
$ rm strcmp{,.o} ; make strcmp
gcc -fPIC -DHAVE_CONFIG_H -DSHELL  -g -O2 -I. -I.. -I../.. -I../../lib -I../../builtins -I../../include -I/home/southerd/devel/random/bash-4.2 -I/home/southerd/devel/random/bash-4.2/lib -I/home/southerd/devel/random/bash-4.2/builtins  -c -o strcmp.o strcmp.c
gcc -shared -Wl,-soname,strcmp  -L./lib/termcap  -o strcmp strcmp.o 
$ enable -f ./strcmp strcmp
$ strcmp hi ho ; echo $?
2
$ strcmp hi ha ; echo $?
1
$ strcmp hi hi ; echo $?
0
```

If you didn't get any errors, you're a-ok! That's all there is to writing a bash builtin. Now, the shell is even more powerful!

---
author: admin
comments: true
date: 2012-04-13 20:47:34+00:00
layout: post
slug: git-svn-dcommit-hooks
title: git svn dcommit hooks
wordpress_id: 341
categories:
- Technology
tags:
- git
- git hooks
- git-svn-dcommit
- svn
---

Working with git and svn is as easy as `git svn init ; git svn rebase ; git svn dcommit`. What is slightly less trivial is adding hooks to enforce certain project behavior when working with git-svn. Specifically, I want to ensure and enforce that the build (locally, at least) is successful before I push to Subversion. In this case, I don't have access to the Subversion server, so adding the hooks server-side is impossible. The [recommended approach](http://stackoverflow.com/questions/2014422/hooks-for-git-svn) is to use an intermediate bare repository, but that presents problems with running build scripts on the repository, since there is no working directory to build in. There is [some discussion](http://git.661346.n2.nabble.com/PATCH-v2-git-svn-hook-before-git-svn-dcommit-td6688978.html) on adding svn-dcommit hooks, but that does not look like it will be landing in git any time soon. The  solution I have is to have a repository with split heads. Most of the time, the intermediate repository will have an empty working directory. When a push happens, it will check out master, verify the build, and push to svn, before returning to the empty branch. Let's look at this in practice.
<!-- more -->

If you want to follow along, the script is [available as a gist](https://gist.github.com/8dfc6575f4d3a293be7c).



### Step 0: Upstream SVN



This is just so we have an SVN repo to look at. This step requires svn, svnadmin, and ssh. Having keys configured for ssh on localhost will make life easier.

[bash]
ROOT=~/devel/$USER/git-experiments/svnhooks
mkdir $ROOT ; cd $ROOT
svnadmin create svn

cd svn
cat >| conf/svnserve.conf <<SVN
[general]
anon-access = write
SVN
cd ..

svn mkdir --parents file://$ROOT/svn/experiments/{trunk,branches,tags} -m 'Initial structure'
svnserve -d -r $ROOT/svn

svn co svn://localhost/experiments/ svnwork
cd svnwork/trunk
echo "Mashed Potatoes" >> recipe
svn add recipe
svn commit -m 'Added recipe.'
[/bash]



### Step 1: Interim git Repo


We're going to set up an intermediate git repo with two branches. master will still point to the SVN repo, and the new branch stage will let us keep the working directory clean and in sync with downstream changes.
[bash]
cd $ROOT
git svn clone -s svn://localhost/experiments/ upstream
cd upstream
rm .git/hooks/*
git symbolic-ref HEAD refs/heads/stage
rm .git/index
git clean -fdx
touch .empty
git add .empty
git ci -am 'Empty stage.'
[/bash]



### Step 2: Working git Repo


We now want to create a normal git repo, whose remote/origin is the intermediate repo.

[bash]
cd $ROOT
git clone upstream/ work
cd work
git checkout master #Get up to date
[/bash]



### Step 3.0: Build script


Before we delve too deep into the hooks, we need a build script. This "build" script just checks if the file passes our "test" - the recipe has a 'Servings:' list
[bash]
cat >|$ROOT/build <<BUILD
#!/bin/sh
grep 'Servings:' recipe >/dev/null 2>&1
BUILD
chmod a+x $ROOT/build
[/bash]



### Step 3: Intermediate Repo hooks


Now, the heart of this. We are going to set up two hooks. The pre-receive hook is going to verify there are no upstream changes. The post-update hook is going to ensure the build passes, and if so push the changes to SVN.



#### pre-receive


[bash]
cat >| $ROOT/upstream/.git/hooks/pre-receive <<PRE
#!/bin/bash

echo "pre-receive"
DIR="\$(pwd)"

export GIT_DIR="\$DIR"
export GIT_WORK_TREE="\${DIR%/.git}"

CUR=\$(git rev-list master | wc -l)

echo "Before rebase, had \$CUR commits"

cd \$GIT_WORK_TREE
git checkout master
git svn rebase
REBASED=\$?
git checkout stage >/dev/null 2>&1

if [ -not \$REBASED -eq 0 ]
then
	echo "Rebase failed"
	exit $REBASED
fi

POST=\$(git rev-list master | wc -l)
echo "After rebase, have \$POST commits"

echo "Object counts were \$CUR::\$POST"
if [ ! \$CUR = \$POST ]
then
	echo "New changes from SVN, please merge."
	exit 1
fi
echo "pre-receive found SVN is up to date."
exit 0
PRE
chmod a+x $ROOT/upstream/.git/hooks/pre-receive
[/bash]



#### post-update


[bash]
cat >| $ROOT/upstream/.git/hooks/post-update <<POST
#!/bin/bash

echo "post-update"

DIR=\$(pwd)
echo "In \$DIR"
export GIT_DIR="\$DIR"
export GIT_WORK_TREE="\${DIR%/.git}"

echo "GIT: \$GIT_DIR; in \$GIT_WORK_TREE (\`pwd\`)"

cd \$GIT_WORK_TREE

git checkout master

$ROOT/build #CHANGE THIS TO YOUR BUILD LINE
BUILT=\$?

echo "Build finished with \$BUILT"

if [ \$BUILT -eq 0 ]
then
	git svn dcommit
else
	echo "Could not build, not pushing to SVN."
fi

git checkout stage >/dev/null 2>&1
POST
chmod a+x $ROOT/upstream/.git/hooks/post-update
[/bash]



### Step 4: Test





#### Push -> Break


In our first test, we want to try and commit code that will break the build. After this operation, the Intermediate repo and the working repo will have consistent code, but those commits will not have been passed to the upstream SVN server.

[bash]
cd $ROOT/work
cat >> recipe <<ing
4 Potatoes, diced
salt, 4 cups
water, 1 tablespoon
ing
git ci -am 'Added ingredients list.'
git push 2>&1 | tee $ROOT/tmp
fgrep "remote: Could not build, not pushing to SVN." $ROOT/tmp || echo "Couldn't find fail line"
[/bash]



#### Push -> dcommit


In our second test, we want to make sure we see a push to SVN.

[bash]
cd $ROOT/work
cat >> recipe <<ing
Servings: 3
ing
git ci -am 'Added Serving size.'
git push 2>&1 | tee $ROOT/tmp
fgrep "remote: Resetting to the latest" $ROOT/tmp || echo "Couldn't find fail line"
[/bash]



#### Push -> Rebase


What happens when other developers commit to the upstream svn? If the commits don't conflict, ideally we'd like the hooks to pull down the upstream changes, rebase the new changes on top, and check if the build has broken. Assuming it hasn't, it should push the new tree, and politely inform us that there are new changes we need to rebase our working repo onto.

[bash]
cd $ROOT/svnwork/trunk
svn update
cat >| shopping <<LIST
Potatoes
LIST
svn add shopping
svn commit -m 'Started a shopping list.'

cd $ROOT/work
cat >> recipe <<INST
Begin by adding salt to the water and bringing it to a boil.
INST
git ci -am "Added step 1"
git pull --rebase #Get upstream changes
git push 2>&1 | tee $ROOT/tmp
fgrep "New changes from SVN, please merge." $ROOT/tmp || echo "SVN Should be more recent"
git pull --rebase
git push 2>&1 | tee $ROOT/tmp
fgrep "pre-receive found SVN is up to date" $ROOT/tmp || echo "SVN Should be up to date"
[/bash]



#### Push -> Conflict


The last test of our script is what happens when there is a conflicting upstream commit. Here, the pre-commit will fail after pulling the change, warn of the commit, and recommend a pull --rebase. After completing the rebase in work, we push it back up and the project is healthy again.

[bash]
cd $ROOT/svnwork/trunk
svn update
sed -i 's/salt, 4 cups/Salt, 4 tablespoons/' recipe 
svn commit -m 'Reduced the salt level.'

cd $ROOT/work
git pull --rebase
sed -i 's/salt, 4 cups/Salt, 1 tablespoon/' recipe 
sed -i 's/water, 1 tablespoon/Water, 1 cup/' recipe
git ci -am 'Fixed salt/water qty mismatch'
git push 2>&1 | tee $ROOT/tmp
git pull --rebase

ed -s recipe <<ED
3d
4,6d
4s/1/4/
5d
w
q
ED

git add recipe
git rebase --continue
git push
[/bash]

That's it. Work flows in the normal branch/hack/commit/merge approach git emphasizes, and git push works upstream with no difficulties. Frequent use of `git pull --rebase` is always recommended, and works here as expected. The full script for all these blocks of code is [available as a gist](https://gist.github.com/8dfc6575f4d3a293be7c).

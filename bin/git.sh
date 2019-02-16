#!/bin/sh
rm -rf .git
(cd "$1" && git init)
echo node_modules >> $1/.gitignore
echo package-lock.json >> $1/.gitignore
(cd "$1" && git add . && git commit -m "init")



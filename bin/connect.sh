#!/bin/sh
server=188.226.163.24
freeport=$(ssh root@$server freeport.sh)
echo $freeport

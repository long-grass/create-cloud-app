#!/bin/sh
freeport=$(ssh root@$1 freeport.sh)
echo $freeport

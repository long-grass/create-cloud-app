#!/bin/sh
server=188.226.163.24
# if (( $# != 1 )); then
#   echo "please name your app!"
#   exit
# fi
./freeport.sh
# freeport=./freeport.sh
# echo $freeport
# export freeport=./freeport.sh
export freeport=$(ssh root@$server freeport.sh)
function find_a_port() {
    local port=$(jot -r - 56000 63000 | head -1)
    netstat -lat | grep $port > /dev/null
    if [[ $? == 1 ]] ; then
        echo $port
        export port=$port
    else
        find_a_port
    fi
}

find_a_port

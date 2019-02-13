if (( $# != 1 )); then
  echo "please name your app!"
  exit
fi
node index.js $1

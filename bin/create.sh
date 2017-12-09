if (( $# != 1 )); then
  echo "please name your app!"
  exit
fi
port=$(grep port server.js | head -1 | awk -F= '{ print $2 }')
echo $port
cp nginx/template.conf nginx/$1.conf
sed -i "" -e "s/app_name/$1/" nginx/$1.conf
sed -i "" -e "s/port/$port/" nginx/$1.conf
echo $1 > APPNAME
sftp root@188.226.163.24 << EOF
  cd /etc/nginx/conf.d
  put nginx/$1.conf
  mkdir /var/www/html/$1
  cd /var/www/html/$1
  put server.js
  mkdir dist
  put -r dist
  bye
EOF
ssh root@188.226.163.24 << EOF
  cd /var/www/html/$1
  npm install express
  pm2 start server.js
  service nginx reload
EOF

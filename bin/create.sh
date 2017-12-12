source bin/config.env
if (( $# != 1 )); then
  echo "please name your app!"
  exit
fi
port=$(grep port server.js | head -1 | awk -F= '{ print $2 }')
export portfree=$(ssh root@$server lsof -i tcp:$port)
echo $port
if [  "$portfree" ];
  then echo 'that port is in use on remote server'
  exit
fi
cp nginx/template.conf nginx/$1.conf
sed -i "" -e "s/app_name/$1/" nginx/$1.conf
sed -i "" -e "s/port/$port/" nginx/$1.conf
echo "appname=$1" >> bin/config.env
sftp root@$server << EOF
  cd /etc/nginx/conf.d
  put nginx/$1.conf
  mkdir /var/www/html/$1
  cd /var/www/html/$1
  put server.js
  mkdir dist
  put -r dist
  bye
EOF
ssh root@$server << EOF
  cd /var/www/html/$1
  npm install express
  pm2 start server.js --name $1
  service nginx reload
EOF

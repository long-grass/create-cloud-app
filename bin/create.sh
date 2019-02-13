if (( $# != 1 )); then
  echo "please name your app!"
  exit
fi
node index.js $1
sftp root@$1 << EOF
  cd /etc/nginx/conf.d
  put nginx/$1.conf
  mkdir /var/www/html/$1
  cd /var/www/html/$1
  put server.js
  put package.json
  mkdir dist
  put -r dist
  bye
EOF
ssh root@$1 << EOF
  cd /var/www/html/$1
  npm install --only=production
  pm2 start server.js --name $1
  service nginx stop
	/opt/letsencrypt/letsencrypt-auto certonly --standalone -d $1
	service nginx start
EOF

sftp root@$1 << EOF
  cd /etc/nginx/conf.d
  put $1/nginx/$1.conf
  mkdir /var/www/html/$1
  cd /var/www/html/$1
  put $1/server.js
  put $1/package.json
  mkdir dist
  put -r $1/dist
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

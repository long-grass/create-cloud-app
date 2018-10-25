source bin/config.env
if (( $# != 1 )); then
  echo "please name your app!"
  exit
fi
port=$(gshuf -n 1 -i 49152-65535)
echo $port
if [  "$portfree" ];
  then echo 'that port is in use, try it again mate'
  exit
fi
sed -i "" -e "s/port=.*/port=$port/" server.js
cp nginx/template.conf nginx/$1.conf
sed -i "" -e "s/server_name.*/server_name\ $1\;/" nginx/$1.conf
sed -i "" -e "s/localhost.*/localhost\:$port\;/" nginx/$1.conf
sed -i "" -e "s/name.*/name\"\:\ \"$1\",/" package.json
sed -i "" -e "s/live[^P]*fullchain/live\/$1\/fullchain/" nginx/$1.conf
sed -i "" -e "s/live[^P]*privkey/live\/$1\/privkey/" nginx/$1.conf
sed -i "" -e "s/appname.*/appname=$1/" bin/config.env
sftp root@$server << EOF
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
ssh root@$server << EOF
  cd /var/www/html/$1
  npm install --only=production
  pm2 start server.js --name $1
  service nginx stop
	/opt/letsencrypt/letsencrypt-auto certonly --standalone -d $1
	service nginx start
EOF

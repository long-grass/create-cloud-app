source bin/config.env
rsync --rsh=ssh -av server.js "root@$server:/var/www/html/$appname"
rsync --rsh=ssh -av dist "root@$server:/var/www/html/$appname"
ssh root@$server pm2 restart $appname

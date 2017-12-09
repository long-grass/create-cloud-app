app=$(cat APPNAME)
rsync --rsh=ssh -av server.js "root@188.226.163.24:/var/www/html/$app"
rsync --rsh=ssh -av dist "root@188.226.163.24:/var/www/html/$app"

module.exports = (AppName, Port) => `server {
    listen 80;
    server_name ${AppName};
    return 301 https://$host$request_uri;
  }
  
  server {
    listen 443 ssl;
    server_name ${AppName};
    ssl_certificate /etc/letsencrypt/live/${AppName}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${AppName}/privkey.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
  
    location / {
      proxy_pass http://localhost:${Port};
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  `
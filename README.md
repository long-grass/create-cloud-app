![screenshot](https://wf29.io37.cc/public/d4.png)

# TLDR / What is it?

A script to provision a new app on a cloud server

# Why?

No more fiddling around with nginx or files. The create script punts out a skeleton express app and configures nginx for you, the deploy script pushes up your server.js and your dist folder. This means its easily integrated with a react app, once you've bundle everything to the dist folder, all thats needed is the server.js and the dist folder.

I felt there was a gap between creating a production build and deploying to a non PAAS environment. Especially when it comes to handling static assets


# How do I run it?

To create an app called postcard, running as subdomain at io37.ch
```
npm run create postcard.io37.ch
```

This will create a skeleton react/node/nginx app available at https://postcard.io37.ch and add the name to config.env

# What does it do?

### create.sh

1. creates an nginx file for your app, with app name (eg cadiz) and port set
2. creates a directory for your app, and uploads the template server.js file, the created package.json and a dist folder with an index.html inside
3. install express
4. starts your app with pm2 
5. reloads nginx

app should be visible at your url


# Requirements

1. CentOS on your cloud server, though I'll add in a Debian/Ubuntu version too
2. Nginx installed and running on cloud server. 
3. PM2 installed and running on cloud server. Though this could be replaced with something like forever.
4. LetsEncrypt installed on cloud server. Comment the letsencrypt lines if you don't have that

# What doesn't it do?

1. Sets up nginx or pm2 for you. Really this is intended for my working environment, but shouldnt be too difficult to modify for other environments


# Example

See example directory for structuring of app

## TODO

* [√]  Move file creation from bash to node
* [√]  Edits package.json with name of app
* [√]  Move created app to its own subdir
* [√]  Re-init git

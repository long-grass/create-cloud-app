# TLDR / What is it?

A script to provision a new app on a cloud server

# Why?

No more fiddling around with nginx or files. The create script punts out a skeleton express app and configures nginx for you, the deploy script pushes up your server.js and your dist folder. This means its easily integrated with a react app, once you've bundle everything to the dist folder, all thats needed is the server.js and the dist folder.

I felt there was a gap between creating a production build and deploying to a non PAAS environment. Especially when it comes to handling static assets


# How do I run it?

To create an app called cadiz
```
./bin/create.sh cadiz
```

This will create a skeleton app available at eg cadiz.malham.io

```
./bin/deploy.sh
```

Deploy script to push to name of app contained in APPNAME


# What does it do?

### create.sh

1. creates an nginx file for your app, with app name (eg cadiz) and port set
2. creates a directory for your app, and uploads the template server.js file, and a dist folder with an index.html inside
3. install express
4. starts your app with pm2 
5. reloads nginx

app should be visible at your url

### deploy.sh

1. rsyncs your server.js and dist folder, from eg something bundled with react. you can add this to a package.json like

```
deploy: './bin/deploy.sh'
```

# Requirements

1. CentOS on your cloud server, though I'll add in a Debian/Ubuntu version too
2. Nginx installed and running. 
3. PM2 installed and running. Though this could be replaced with something like forever.

# What doesn't it do?

1. Sets up nginx or pm2 for you. Really this is intended for my working environment, but shouldnt be too difficult to modify for other environments


# Example

See example directory for structuring of app

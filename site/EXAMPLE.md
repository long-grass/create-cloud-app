# Sample React structure (truncated)

Below is a truncated sample app structure for an application called Cadiz that uses this deploy script. In this example the build script would compile the app tto the dist folder, and the deploy script will update the cloud server from the sample that was build with the create script.

```
cadiz git:(master) cat package.json
  "scripts": {
    "dev": "webpack-dev-server --config webpack/dev.config.js",
    "build": "webpack --config webpack/prod.config.js && npm run copy",
    "copy": "cp -r src/index.html dist && cp -r public dist",
    "start": "node server.js",
    "deploy": "./bin/deploy.sh"
  }
```

```
➜  cadiz git:(master) tree . -L 3
.
├── README.md
├── bin
│   └── deploy.sh
├── dist
│   ├── index.html
│   ├── public
│   │   ├── d4.png
│   └── bundle
│       ├── bundle.js
├── cadiz
├── package.json
├── public
│   ├── d4.png
├── server.js
├── src
│   ├── components
│   │   ├── Hello.js
│   ├── containers
│   │   └── AppContainer.js
│   ├── css
│   │   ├── font-awesome.css
│   │   └── index.css
│   ├── fonts
│   │   ├── FontAwesome.otf
│   ├── index.html
│   ├── index.js
└── webpack
    ├── base.config.js
    ├── dev.config.js
    └── prod.config.js
```


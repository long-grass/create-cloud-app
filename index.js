#!/usr/bin/env node

'use strict'

const AppName = process.argv[2]
if (!AppName) {
  console.log("no")
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

const { spawn, spawnSync } = require('child_process')
const createNginx = require('./template/nginx.js');
const createServer = require('./template/server.js');
const createConf = require('./template/config.js');
const createPackageJson = require('./template/package.js')

spawnSync('cp', ['-r', './site', AppName])

function testPort () {
  const ls = spawn('sh', ['./bin/connect.sh', AppName]);
  const who = spawnSync('whoami')
  ls.stdout.on('data', (data) => {
    const author = who.stdout.toString().trim()
    const NginxData = createNginx(AppName, data);
    const ServerData = createServer(data)
    const ConfData = createConf(AppName, data)
    const PackageJsonData = createPackageJson(AppName, author)
    createApp(NginxData, ServerData, ConfData, PackageJsonData)
});

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const publish = () => {
  const upload = spawn('sh', ['./bin/upload.sh', AppName]);
  upload.stdout.on('data', (data) => {
    console.log('on')
  });

  upload.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  upload.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  spawnSync('sh', ['./bin/git.sh', AppName]);
}

const createApp = (NginxData, ServerData, ConfData, PackageJsonData) => {
  let nginx = path.resolve(process.cwd(), AppName, 'nginx', `${AppName}.conf`);
  fs.writeFile(nginx, NginxData, function (err) {
    console.log(`${nginx} created`)
  })
  let server = path.resolve(process.cwd(), AppName, 'server.js');
  fs.writeFile(server, ServerData, function (err) {
    console.log(`${server} created`)
  })
  let conf = path.resolve(process.cwd(), AppName, 'bin', 'config.env');
  fs.writeFile(conf, ConfData, function (err) {
    console.log(`${conf} created`)
  })
  let packageJson = path.resolve(process.cwd(), AppName, 'package.json');
  fs.writeFile(packageJson, PackageJsonData, function (err) {
    console.log(`${packageJson} created`)
    publish()
  })
}

testPort()

module.exports = { testPort};



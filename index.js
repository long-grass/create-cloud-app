#!/usr/bin/env node

'use strict'

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process')
const createNginx = require('./files/nginx.js');
const createServer = require('./files/server.js');
const createConf = require('./files/config.js');
const AppName = process.argv[2]
function testPort () {
  const ls = spawn('sh', ['./connect.sh']);
  ls.stdout.on('data', (data) => {
    const NginxData = createNginx(AppName, data);
    const ServerData = createServer(data)
    const ConfData = createConf(AppName, data)
    createApp(NginxData, ServerData, ConfData)
});

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const createApp = (NginxData, ServerData, ConfData) => {
  let nginx = path.resolve(process.cwd(), 'nginx', `${AppName}.conf`);
  fs.writeFile(nginx, NginxData, function (err) {
    console.log(`${AppName} created`)
  })
  let server = path.resolve(process.cwd(), 'server.js');
  fs.writeFile(server, ServerData, function (err) {
    console.log(`${ServerData} created`)
  })
  let conf = path.resolve(process.cwd(), 'bin', 'config.env');
  fs.writeFile(conf, ConfData, function (err) {
    console.log(`${ConfData} created`)
  })
}

testPort()



module.exports = { testPort};



var path = require('path');
var express = require('express');

var app = express();

var port=9021

app.get('/bundle/bundle.js', function(req,res){
  res.sendFile(path.join(__dirname, 'dist', 'bundle', 'bundle.js'));
})

app.get('/public/*', function(req,res){
  res.sendFile(path.join(__dirname, 'dist', 'public', req.params[0]));
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at ' + port);
});

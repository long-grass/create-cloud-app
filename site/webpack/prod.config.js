var path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig(), {

      output: {
        path: path.join(__dirname, '..', 'dist', 'bundle'),
        filename: 'bundle.js',
      }
    })

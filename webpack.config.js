const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
let webpack = require('webpack');
let yargs = require('yargs');

const jsLoader = 'babel?cacheDirectory';

module.exports = {
  devtool: "eval",

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/,/\/sigma.*\//] },
      { test: /\/sigma\/[^\/]*\.js/, loader: 'imports?this=>window' },  // locally built sigma lib
      { test: /\/sigma[^\/]*\/build.*\.js/, loader: 'imports?this=>window' }, // resources from sigma lib
    ]
  },

  plugins: []
}

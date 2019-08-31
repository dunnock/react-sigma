let webpack = require('webpack');
let yargs = require('yargs');

const jsLoader = 'babel-loader?cacheDirectory';

module.exports = async function( { config }) {
  config.devtool = "eval";
  config.module.rules.push(
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/,/\/sigma.*\//] },
      { test: /\/sigma\/[^\/]*\.js/, loader: 'imports-loader?this=>window' },  // locally built sigma lib
      { test: /\/sigma[^\/]*\/build.*\.js/, loader: 'imports-loader?this=>window' } // resources from sigma lib
  );
  return config;
}

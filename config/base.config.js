const webpack = require('webpack');
const yargs = require('yargs');
const babelConfig = require('./babel.config');

const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

const babelLoader = {
          loader: 'babel-loader',
          options: babelConfig(options.optimizeMinimize?"production":"development")
        };

const importsLoader = {
          loader: 'imports-loader',
          options: "this=>window"
        };

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  module: {
    rules: [
      { test: /\.js/, use: [babelLoader], exclude: [/node_modules/,/\/sigma.*\//] }
    ],
    noParse: [/\/sigma.*\//]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

module.exports = {options, babelLoader, importsLoader, baseConfig, default: baseConfig}

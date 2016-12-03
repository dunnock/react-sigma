let webpack = require('webpack');
let yargs = require('yargs');
let { sigmaSrcRoot, sigmaDistRoot, sigmaPluginsRoot } = require('../config/paths')

let options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

let jsLoader = 'babel?cacheDirectory';

module.exports = {
  options: options,

  entry: {
    'main': sigmaSrcRoot + '/main.js',
    'webgl': sigmaSrcRoot + '/webgl.js',
    'edges': sigmaSrcRoot + '/edges.js',
    'nodes': sigmaSrcRoot + '/nodes.js',
    'parsers.json': sigmaPluginsRoot + '/sigma.parsers.json/sigma.parsers.json.js',
    'parsers.gexf': [ sigmaPluginsRoot + '/sigma.parsers.gexf/gexf-parser.js',
                      sigmaPluginsRoot + '/sigma.parsers.gexf/sigma.parsers.gexf.js' ],
    'neo4j.cypher': sigmaPluginsRoot + '/sigma.neo4j.cypher/sigma.neo4j.cypher.js',
    // add any extra sigma modules here
  },

  output: {
    path: sigmaDistRoot,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'Sigma',
    libraryTarget: 'umd',
  },

  externals: undefined,

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/,/sigma.*\/src/] },
      { test: /sigma.*\/src/, loader: 'imports?this=>window' },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

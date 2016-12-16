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
    'plugins.filter': sigmaPluginsRoot + '/sigma.plugins.filter/sigma.plugins.filter.js',
    'layout.forceAtlas2': [ sigmaPluginsRoot + '/sigma.layout.forceAtlas2/supervisor.js',
                            sigmaPluginsRoot + '/sigma.layout.forceAtlas2/worker.js'],
    'layout.forceLink': [ sigmaPluginsRoot + '/sigma.layouts.forceLink/supervisor.js',
                            sigmaPluginsRoot + '/sigma.layouts.forceLink/worker.js'],
    'plugins.animate': sigmaPluginsRoot + '/sigma.plugins.animate/sigma.plugins.animate.js',
    'plugins.generators': sigmaPluginsRoot + '/sigma.plugins.generators/sigma.plugins.generators.js',
    'layout.noverlap': sigmaPluginsRoot + '/sigma.layout.noverlap/sigma.layout.noverlap.js',
    'plugins.relativeSize': sigmaPluginsRoot + '/sigma.plugins.relativeSize/sigma.plugins.relativeSize.js',
    // add any extra sigma modules here
  },

  output: {
    path: sigmaDistRoot,
    filename: '[name].js',
    library: 'Sigma',
    libraryTarget: 'umd',
  },

  externals: undefined,

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/] },
      { test: /sigma\-react\/.*\.js/, loader: 'imports?this=>window' },
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

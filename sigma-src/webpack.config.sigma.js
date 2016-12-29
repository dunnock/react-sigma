const webpack = require('webpack');
const { sigmaSrcRoot, sigmaDistRoot, sigmaPluginsRoot } = require('../config/paths');
const { baseConfig, babelLoader, importsLoader } = require('../config/base.config.js');

const config = {
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
    'layout.dagre': [ sigmaSrcRoot + '/dagre.js'],
    'plugins.animate': sigmaPluginsRoot + '/sigma.plugins.animate/sigma.plugins.animate.js',
    'plugins.generators': sigmaPluginsRoot + '/sigma.plugins.generators/sigma.plugins.generators.js',
    'layout.noverlap': sigmaPluginsRoot + '/sigma.layout.noverlap/sigma.layout.noverlap.js',
    'plugins.relativeSize': sigmaPluginsRoot + '/sigma.plugins.relativeSize/sigma.plugins.relativeSize.js',
    // add any extra sigma modules here
  },
  module: {
    rules: [
      { test: /\.js/, use: [babelLoader], exclude: [/node_modules/] },
      { test: /sigma\-react\/.*\.js/, use: [importsLoader] },
    ],
//    noParse: [/\/sigma\-react\//]
  },
  output: {
    path: sigmaDistRoot,
    filename: '[name].js',
    library: 'Sigma',
  }
}

module.exports = Object.assign({}, baseConfig, config)

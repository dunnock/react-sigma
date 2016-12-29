const {baseConfig, options} = require('./base.config');
const { distRoot } = require('./paths');

const config = {
  entry: {
    'react-sigma': './src/index.js',
  },

  output: {
    path: distRoot,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'ReactSigma',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};

module.exports = Object.assign({}, baseConfig, config);

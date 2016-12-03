import baseConfig, { options } from './base.config';
import { distRoot } from './paths'

export default {
  ...baseConfig,

  entry: {
    'react-sigma': './src/index.js',
  },

  output: {
    path: distRoot,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'Sigma',
    libraryTarget: 'umd',
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
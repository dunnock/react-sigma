
// Duplicated with ../.babelrc for now.
const baseConfig = {
  "presets": [
    ["es2015", {modules: false}],
    "react"
  ],
  "plugins": [
    "flow-react-proptypes",
    "transform-export-extensions",
    "transform-class-properties"
  ]
};

module.exports = (type) => {
  return {
    "production": {
      cacheDirectory: true,
      babelrc: false,
      presets: baseConfig.presets,
      plugins: baseConfig.plugins.filter(plugin => plugin !== "flow-react-proptypes")
    },
    "development": {
      cacheDirectory: true,
      babelrc: false,
      presets: baseConfig.presets,
      plugins: baseConfig.plugins
    },
    "es": {
      babelrc: false,
      presets: [ "react" ],
      plugins: baseConfig.plugins
    }
  }[type] || (() => {throw new Error(`Unsupported type for babel ${type}`)})();
};

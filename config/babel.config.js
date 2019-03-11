
// Duplicated with ../.babelrc for now.
const plugins = [
    "flow-react-proptypes",
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties"
  ];

module.exports = (type) => {
  return {
    "production": {
      babelrc: false,
      presets: [ ["@babel/preset-env", {targets: {browsers: ">5%"}}], "@babel/preset-react"],
      plugins: plugins.filter(plugin => plugin !== "flow-react-proptypes")
    },
    "development": {
      babelrc: false,
      presets: [ ["@babel/preset-env", {targets: {browsers: ">5%"}}], "@babel/preset-react"],
      plugins
    },
    "es": {
      babelrc: false,
      presets: [ ["@babel/preset-env", {modules: false}], "@babel/preset-react" ],
      plugins
    }
  }[type] || (() => {throw new Error(`Unsupported type for babel ${type}`)})();
};

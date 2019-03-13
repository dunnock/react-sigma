// babel.config.js
module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "flow-react-proptypes",
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties"
  ]
};
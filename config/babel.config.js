
// Duplicated with ../.babelrc for now.
const baseConfig = {
  "presets": [
    "es2015",
    "react"
  ],
  "plugins": [
    "flow-react-proptypes",
    "transform-export-extensions",
    "transform-class-properties"
  ]
}

export default function babelConfig(type) {
  let config
  if(type === "production")
    config = {
      presets: baseConfig.presets,
      plugins: baseConfig.plugins.filter(plugin => plugin !== "flow-react-proptypes")
    }
  else if(type === "development")
    config = baseConfig
  else if(type === "es")
    config = {
      presets: [ "react" ],
      plugins: baseConfig.plugins
    }

  return Object.assign({
          cacheDirectory: true,
          babelrc: !!config},
          config)
}

# How to setup

## Folder Structure

```
react-sigma/
  README.md
  node_modules/
  package.json
  public/ -- static content
  src/    -- sources
  sigma-src/ -- interface to sigma library
  types/  -- types for @flow checking
```

## Prerequisites

- node.js 4+
- npm

### `canvas`

Please note, distribution includes 'canvas-node' module suitable for running jsdom tests (sigma.js functionality). This package requires some global libraries dependencies to compile, please refer to [canvas installation](https://github.com/Automattic/node-canvas#installation) page for setup instructions.

### Enable flow type checking

Application is built with flow type checking embedded. But it requires flow-typed installed globally:

```
npm install -g flow-typed
flow-typed
```

## Available Scripts

In the project directory, you can run:

### `npm run storyboard`

Runs the app's storyboard with component visualizations.

The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests in create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run flow`

Performs flow type check, highly recommended before starting build.
Please note, all application custom types are stored in Component files (props and state descriptions) as well as under /types/ subdir.


# create-react-app regards

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
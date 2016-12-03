React-Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for linked graphs. Sigma is a fastest JavaScript library dedicated to graph drawing. It makes easy to publish networks on
Web pages, and allows developers to integrate network exploration in rich Web applications.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
  - [npm install](#npm-install)
  - [Enable flow type checking](enable-flow-type-checking)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run flow](#npm-run-flow)
- [Usage](#usage)
  - [Sigma component]
  - 
- [create-react-app](#create-react-app-regards)

## Folder Structure

```
sitegraph/
  README.md
  node_modules/
  package.json
  public/ -- static content
  src/    -- sources
  types/  -- types for @flow checking
```

## Prerequisites

- node.js 4+
- npm

### `npm install`

Please note, distribution includes 'canvas-node' module suitable for running jsdom tests (sigma.js functionality). This package requires some global libraries dependencies to compile, please refer to [canvas installation](https://github.com/Automattic/node-canvas#installation) page for setup instructions.

### Enable flow type checking

Application is built with flow type checking embedded. But it requires flow-typed installed globally:

```
npm install -g flow-typed
flow-typed
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run flow`

Performs flow type check, highly recommended before starting build.
Please note, all application custom types are stored in Component files (props and state descriptions) as well as under /types/ subdir.


# Usage

Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for linked graphs.
Sigma makes easy to publish networks on Web pages, and allows developers to integrate network exploration in rich Web applications.

## Sigma component

Sigma is the main component which reserves <div> area with a given style (default is full width, 500px height), 
initializes renderer and camera in the given area and starts rendering graph.
<Sigma> be composed with sigma sub-components using JSX syntax, e.g.:

```
    <SigmaEnableWebGL/>
    <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
           settings={{drawEdges:false}}
           onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
           graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
      <RelativeSize initialSize={8} />
    </Sigma>
```

### Parameters:

 - @style  CSS   CSS style description for main div holding graph, should be specified in React format
 - @settings  Sigma$Settings     js object with sigma initialization options
                as described on [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings)
 - @renderer   string     can be "webgl" or "canvas"
 - @graph     Sigma$Graph$Data   js object with array of nodes and edges used to initialize sigma
 - @onClickNode  (e) => void     set sigma callback for "clickNode" event (see below)
 - @onOverNode   (e) => void     set sigma callback for "overNode" event
 - @onOutNode    (e) => void     set sigma callback for "outNode" event
 - @onClickEdge  (e) => void     set sigma callback for "clickEdge" event
 - @onOverEdge   (e) => void     set sigma callback for "overEdge" event
 - @onOutEdge    (e) => void     set sigma callback for "outEdge" event

### Callbacks:

 Sigma callback receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
 with the following structure (see Sigma$Event type under /types/sigma.js):
 ```
  .data
     .captor   -- information about event handler, for instance position on the page {clientX, clientY}
     .node?     -- for node events is sigma node data
     .edge?     -- for edge events is sigma edge data
 ```

### Types

All defined Sigma types stored under /types/sigma.js, can be used as a reference for objects and parameters.

## Extending sigma components

 Sigma container will mount any child component with sigma instance under props.sigma. This way sigma
 functionality may be extended indefinitely:

```
call MyCustomSigma extends React.Component {
  constructor(props) {
    super(props)
    props.sigma.graph.addNode({id:"n3", label:props.label});
  }
}
...
return  <Sigma>
      <MyCustomSigma label="Label">
    </Sigma>
```

### Asynchronous graph data loading

 Component which initializes asynchronously is supposed to mount its children only after initialized
 (for example LoadJSON), which makes possible to build sequential composition in the pure JSX without
 any callbacks or handlers. In the following example RelativeSize will be counted only after loading 
 from arctic.json file.


```
    <Sigma>
      <LoadJSON url="/arctic.json">
        <RelativeSize initialSize={8}/>
      </LoadJSON>
    </Sigma>
```



# create-react-app regards

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


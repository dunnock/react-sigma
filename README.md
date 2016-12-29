[![npm version][img-1]][1]
[![Build Status][img-2]][2]

[img-1]: https://img.shields.io/npm/v/react-sigma.svg
[img-2]: https://travis-ci.org/dunnock/react-sigma.svg?branch=master

[1]: https://www.npmjs.com/package/react-sigma "npm version"
[2]: https://travis-ci.org/dunnock/react-sigma

It makes easy to publish networks on Web pages and allows developers to integrate network exploration in rich Web applications. Use JSX for graph configuration, including asynchronous graph loading. Library is lightweight and modular, so you can bundle only what you use. Easy to extend with additional components.

## Table of Contents

- [Usage](#usage)
- [Components reference](#components-reference)
 - [Sigma](#sigma)
 - [SigmaEnableWebGL](#sigmaenablewebgl)
 - [Extending sigma components](#extending-sigma-components)
 - [Components composition](#components-composition)
- [Types](#types)

# Usage

See [storybook for working examples](https://dunnock.github.io/react-sigma/).

## Install

`npm install --save react-sigma`

or

`yarn add react-sigma`

or

`bower install https://unpkg.com/react-sigma@1.2/dist/react-sigma.min.js`

If you don't want to use webpack or browserify, you could always reference the
single file distribution, library will be available under global var ReactSigma:

`<script src="https://unpkg.com/react-sigma@1.2/dist/react-sigma.min.js"/>`

## Simple use case with embedded graph

```
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
...
<Sigma graph={{nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]}} settings={{drawEdges:true}}>
	<RelativeSize initialSize={15}/>
	<RandomizeNodePositions/>
</Sigma>
```
Note that graph nodes require x, y and size defined in order to be displayed, [plugins like RelativeSize and RandomizeNodePositions might help to generate those](https://github.com/dunnock/react-sigma/blob/master/DOCS.md#nodes-distribution).

## Simple use case with graph loaded from external file

```
import {Sigma, LoadJSON} from 'react-sigma'
...
<Sigma style={{width:"200px", height:"200px"}}>
  <LoadJSON path="/public/data.json" />
</Sigma>
```

## Advanced use case
```
...
<Sigma renderer="canvas">
	<EdgeShapes default="tapered"/>
	<NodeShapes default="star"/>
	<LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
		<Filter neighborsOf={ this.state.filterNeighbours } />
		<ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={3000}/>
		<RelativeSize initialSize={15}/>
	</LoadGEXF>
</Sigma>
```

## Minimizing bundle

Minimized sigma with minimum required functionality is 76kb, more when plugins added.
Using webpack2 or rollup nothing need to be done. Webpack1 does not support tree shaking and require explicit submodules import to bundle only what's been used, e.g.:
```
import Sigma from 'react-sigma/lib/Sigma'
import LoadJSON from 'react-sigma/lib/LoadJSON'
```

# Components reference

Please see [react-sigma reference](https://github.com/dunnock/react-sigma/blob/master/DOCS.md) for details. Below is a brief concept.

## Sigma

Sigma is the main component which reserves <div> area with a given style (default is full width, 500px height),
initializes renderer and camera in the given area and starts rendering graph.
<Sigma> be composed with sigma plugins using JSX syntax, e.g.:

```
<Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
		settings={{drawEdges:false}}
		onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
		graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<RelativeSize initialSize={8} />
</Sigma>
```

## SigmaEnableWebGL

By default sigma package includes only canvas rendering functions with webpack2, though it can be easily extended with WebGL. Importing SigmaEnableWebGL enables WebGL renderer, setting it as default renderer if WebGL is supported by browser. With webpack1 webgl rendering functions are imported by default, so you don't need to worry.

```
import { Sigma, SigmaEnableWebGL } from 'react-sigma'
...
<Sigma /> // will use webgl renderer if supported by browser
```

## Extending sigma components

Sigma container will mount any child component with sigma instance under props.sigma. This way you can write custom sigma-aware components:

```
class MyCustomSigma extends React.Component {
	constructor(props) {
		super(props)
		props.sigma.graph.addNode({id:"n3", label:props.label})
	}
}
...
return  <Sigma>
	<MyCustomSigma label="Label">
</Sigma>
```

## Components composition

Component which initialize or provide graph changes asynchronously are supposed to mount children
after initialized. For instance LoadJSON will render child subcomponents only after loading. This makes possible to build sequential composition in the pure JSX without any callbacks or handlers. In the following example RelativeSize will be instantiated only after loading from arctic.json file.


```
<Sigma>
	<LoadJSON url="/arctic.json">
		<RelativeSize initialSize={8}/>
	</LoadJSON>
</Sigma>
```

# Types

All defined Sigma types stored under /types/sigma.js, can be used as a reference for objects and parameters.
TODO: move to flow-typed

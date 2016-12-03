It makes easy to publish networks on Web pages, and allows developers to integrate network exploration in rich Web applications. Library is using JSX for graph configuration, including asynchronous graph loading, so no callback is needed. It's including ES modules supports, so resulting code should consist only of sigma functionality that you explicitly import. Easy to extend with additional components. 

## Table of Contents

- [Usage](#usage)
- [Types](#types)
- [Components reference](#components-reference)
  - [Sigma](#sigma)
  - [EdgeShapes](#edgeshapes)
  - [NodeShapes](#nodeshapes)
  - [Filter](#filter)
  - [ForceAtlas2](#forceatlas2)
  - [NOverlap](#noverlap)
  - [RandomizeNodePositions](#randomizenodepositions)
  - [LoadGEXF](#loadgexf)
  - [LoadJSON](#loadjson)
  - [NeoCypher](#neocypher)
- [Extending sigma components](#extending-sigma-components)


# Usage

```
    <SigmaEnableWebGL/>
    <Sigma key="1"
					onClickNode={ e => this.setState({filterNeighbours: e.data.node.id}) }
					onClickStage={ e => this.setState({filterNeighbours: null}) } >
			<EdgeShapes default="tapered"/>
			<NodeShapes default="star"/>
      <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
        <Filter neighborsOf={ this.state.filterNeighbours } />
      	<ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={3000}/>
        <RelativeSize initialSize={15}/>
      </LoadGEXF>
  	</Sigma>
```

See storybook for more usage recipes.

# Types

All defined Sigma types stored under /types/sigma.js, can be used as a reference for objects and parameters.
TODO: move to flow-typed

# Components reference

## Sigma 

Sigma is the main component which reserves <div> area with a given style (default is full width, 500px height), 
initializes renderer and camera in the given area and starts rendering graph.
<Sigma> be composed with sigma sub-components using JSX syntax, e.g.:

```
    <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
           settings={{drawEdges:false}}
           onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
           graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
      <RelativeSize initialSize={8} />
    </Sigma>
```

### Parameters

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

### Callbacks

 Sigma callback receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
 with the following structure (see Sigma$Event type under /types/sigma.js):
 ```
  .data
     .captor   -- information about event handler, for instance position on the page {clientX, clientY}
     .node?     -- for node events is sigma node data
     .edge?     -- for edge events is sigma edge data
 ```


## EdgeShapes

To assign a shape renderer to an edge, simply set edge.type='shape-name' e.g. edge.type='dotted'.
Note! this Component requires "canvas" renderer to work.

```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<EdgeShapes default="dotted"/>
</Sigma>
```

Supported shapes
```
type Sigma$Edge$Shapes = "line" | "arrow" | "curve" | "curvedArrow" | "dashed" | "dotted" | "parallel" | "tapered";
```

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

Parameters:
 - @default  string  set default sigma edge to be applied to edges where type is not set

## NodeShapes

To assign a shape renderer to an edge, simply set node.type='shape-name'
Note! this Component requires "canvas" renderer to work.

```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<NodeShapes default="star"/>
</Sigma>
```

Extra node properties:
 - node.type='shape-name' - node shape renderer e.g. node.type='cross'.
 - node.borderColor - e.g. node.borderColor='#FF3333'
Details on shapes configuration and possibility to apply images to nodes, please refer to
[plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images).

Supported shapes
```
type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";
```

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

Parameters:
 - @default  string  set default sigma node renderer to be applied to nodes where type is not set


## Filter

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

Parameters:
 - @nodesBy   Nodes$Filter   will hide nodes where filter returns false

```
type Nodes$Filter = (node: Sigma$Node) => boolean;
```

## ForceAtlas2

Running ForceAtlas2 algorythm on graph with progress animation.

It accepts all the parameters of ForceAtlas2 described on its github page:
 - @worker      boolean           Use a web worker to run calculations in separate thread
 - @barnesHutOptimize    boolean  Use the algorithm's Barnes-Hut to improve repulsion's scalability
									This is useful for large graph but harmful to small ones.
 - @barnesHutTheta  number
 - @adjustSizes     boolean
 - @iterationsPerRender  number
 - @linLogMode  boolean
 - @outboundAttractionDistribution   boolean
 - @edgeWeightInfluence  number
 - @scalingRatio    number
 - @strongGravityMode    boolean
 - @gravity     number
 - @slowDown    number
 - @timeout     number   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2)

## NOverlap

Evenly distributes nodes in the grid. Applicable only to small graphs (<100 nodes)

It accepts all the parameters of sigma.layout.noverlap plugin described on its github page:
 - @nodeMargin  number(5)    additional minimum space to apply around each and every node
 - @scaleNodes  number(1.2)  multiplier,  larger nodes will have more space around
 - @gridSize    number(20)   number of rows and columns to use when dividing the nodes up into cell
 - @permittedExpansion     number(1.1)  maximum ratio to apply to the bounding box
 - @speed       number     larger value increases the speed at the cost of precision
 - @maxIterations  number  iterations to run the algorithm for before stopping it
 - @easing      number     camera easing type for camera transition
 - @duration    number     duration of the transition for the easing method
 - @timeout     number     how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.noverlap)

## RandomizeNodePositions

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

## RelativeSize

Sets nodes sizes corresponding its degree.

Parameters:
 - @initialSize  number  start size for every node, will be multiplied by Math.sqrt(node.degree)


## SigmaEnableWebGL

Component enables WebGL renderer, setting it as default renderer if WebGL is supported by browser.

```
<SigmaEnableWebGL />
<Sigma />
```

## LoadGEXF

Parameters:
 - @path       string   path to the GEXF file
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

## LoadJSON

Parameters:
 - @path       string   path to the JSON file
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

## NeoCypher

Load graph from Neo4j database via REST API

Parameters:
 - @url       string    Neo4j instance REST API URL
 - @user      string    Neo4j instance REST API user
 - @password  string    Neo4j instance REST API password
 - @query     string    Neo4j cypher query
 - @producers NeoGraphItemsProducers   Optional transformer for creating Sigma nodes and edges, 
                                    instance compatible with NeoGraphItemsProducers
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)




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




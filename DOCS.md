## Classes

<dl>
<dt><a href="#EdgeShapes">EdgeShapes</a></dt>
<dd><p>EdgeShapes component, interface for customEdgeShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.</p>
<p>Note! this Component requires &quot;canvas&quot; renderer to work.</p>
<p>To assign a shape renderer to an edge, simply set edge.type=&#39;shape-name&#39; e.g. edge.type=&#39;dotted&#39;. </p>
<pre><code>&lt;Sigma renderer=&quot;canvas&quot; graph={{nodes:[&quot;id0&quot;, &quot;id1&quot;], edges:[{id:&quot;e0&quot;,source:&quot;id0&quot;,target:&quot;id1&quot;}]}}&gt;
    &lt;EdgeShapes default=&quot;dotted&quot;/&gt;
&lt;/Sigma&gt;
</code></pre><p>Supported shapes</p>
<pre><code>type Sigma$Edge$Shapes = &quot;line&quot; | &quot;arrow&quot; | &quot;curve&quot; | &quot;curvedArrow&quot; | &quot;dashed&quot; | &quot;dotted&quot; | &quot;parallel&quot; | &quot;tapered&quot;;
</code></pre><p>See <a href="https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes">plugin page</a>
for more datails on implementation.</p>
</dd>
<dt><a href="#Filter">Filter</a></dt>
<dd><p>Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.</p>
<p>Filter is hiding all nodes which do not apply to the provided nodesBy criteria.</p>
</dd>
<dt><a href="#ForceAtlas2">ForceAtlas2</a></dt>
<dd><p>ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.</p>
<p>It accepts all the parameters of ForceAtlas2 described on its github page:</p>
</dd>
<dt><a href="#LoadGEXF">LoadGEXF</a></dt>
<dd><p>LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child&#39;s componentWillMount should be used to enable plugins on loaded graph.</p>
</dd>
<dt><a href="#LoadJSON">LoadJSON</a></dt>
<dd><p>LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child&#39;s componentWillMount should be used to enable plugins on loaded graph.</p>
</dd>
<dt><a href="#NOverlap">NOverlap</a></dt>
<dd><p>NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.</p>
</dd>
<dt><a href="#NeoCypher">NeoCypher</a></dt>
<dd><p>NeoCypher component, interface for neo4j.cypher sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child&#39;s componentWillMount should be used to enable plugins on loaded graph.</p>
</dd>
<dt><a href="#NodeShapes">NodeShapes</a></dt>
<dd><p>NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.</p>
<p>Note! this Component requires &quot;canvas&quot; renderer to work.</p>
<p>Extra node properties:</p>
<ul>
<li>node.type=&#39;shape-name&#39; - node shape renderer e.g. node.type=&#39;cross&#39;.</li>
<li>node.borderColor - e.g. node.borderColor=&#39;#FF3333&#39;
Details on shapes configuration and possibility to apply images to nodes, please refer to
<a href="https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images">plugin page</a>.</li>
</ul>
<p>See <a href="https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes">plugin page</a>
for more datails on implementation.</p>
</dd>
<dt><a href="#RandomizeNodePositions">RandomizeNodePositions</a></dt>
<dd><p>RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.</p>
</dd>
<dt><a href="#RelativeSize">RelativeSize</a></dt>
<dd><p>RelativeSize component, interface for RelativeSize sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.</p>
<p>Sets nodes sizes corresponding its degree.</p>
</dd>
<dt><a href="#Sigma">Sigma</a></dt>
<dd><p>Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for network graphs.
Sigma makes it easy to publish networks on Web pages, and allows developers to integrate network exploration in
rich Web applications.</p>
<p>Can be composed with sigma sub-components using JSX syntax</p>
<pre><code>&lt;Sigma renderer=&quot;webgl&quot; style={{maxWidth:&quot;inherit&quot;, height:&quot;400px&quot;}}
       settings={{drawEdges:false}}
       onOverNode={e =&gt; console.log(&quot;Mouse over node: &quot; + e.data.node.label)}&gt;
       graph={{nodes:[&quot;id0&quot;, &quot;id1&quot;], edges:[{id:&quot;e0&quot;,source:&quot;id0&quot;,target:&quot;id1&quot;}]}}&gt;
  &lt;RelativeSize initialSize={8}/&gt;
&lt;/Sigma&gt;
</code></pre><p>Parameter types</p>
<pre><code>type Sigma$Event = {
  data: {
    node?: Neo4j$Node,
    edge?: Neo4j$Edge,
    captor: {
      clientX: number,
      clientY: number
}}}

type Sigma$EventHandler = (node:Sigma$Event) =&gt; void

type Sigma$Graph$Data = {
  nodes: [Sigma$Node],
  edges: [Sigma$Edge]
};

type Sigma$Node = {
  id: string,
  label?: string,
  x?: number,
  y?: number,
  size?: number,
  color?: color
};

type Sigma$Edge = {
  id: string,
  source: string,
  target: string,
  label?: string,
  color?: color
};
</code></pre></dd>
</dl>

## Functions

<dl>
<dt><a href="#SigmaEnableWebGL">SigmaEnableWebGL()</a></dt>
<dd><p>Component enables WebGL renderer, setting it as default renderer if WebGL is supported by browser.</p>
</dd>
</dl>

<a name="EdgeShapes"></a>

## EdgeShapes
EdgeShapes component, interface for customEdgeShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

To assign a shape renderer to an edge, simply set edge.type='shape-name' e.g. edge.type='dotted'. 
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

<a name="new_EdgeShapes_new"></a>

### new EdgeShapes(default)

| Param | Type | Description |
| --- | --- | --- |
| default | <code>string</code> | set default sigma edge to be applied to edges where type is not set |

<a name="Filter"></a>

## Filter
Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

<a name="new_Filter_new"></a>

### new Filter(nodesBy)

| Param | Type | Description |
| --- | --- | --- |
| nodesBy | <code>Nodes$Filter</code> | will hide nodes where filter returns false type Nodes$Filter = (node: Sigma$Node) => boolean; |

<a name="ForceAtlas2"></a>

## ForceAtlas2
ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of ForceAtlas2 described on its github page:

<a name="new_ForceAtlas2_new"></a>

### new ForceAtlas2([worker], barnesHutOptimize, barnesHutTheta, adjustSizes, iterationsPerRender, [linLogMode], outboundAttractionDistribution, edgeWeightInfluence, scalingRatio, strongGravityMode, gravity, slowDown, timeout)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [worker] | <code>boolean</code> | <code>true</code> | Use a web worker to run calculations in separate thread |
| barnesHutOptimize | <code>boolean</code> |  | Use the algorithm's Barnes-Hut to improve repulsion's scalability 									This is useful for large graph but harmful to small ones. |
| barnesHutTheta | <code>number</code> |  |  |
| adjustSizes | <code>boolean</code> |  |  |
| iterationsPerRender | <code>number</code> |  |  |
| [linLogMode] | <code>boolean</code> | <code>true</code> |  |
| outboundAttractionDistribution | <code>boolean</code> |  |  |
| edgeWeightInfluence | <code>number</code> |  |  |
| scalingRatio | <code>number</code> |  |  |
| strongGravityMode | <code>boolean</code> |  |  |
| gravity | <code>number</code> |  |  |
| slowDown | <code>number</code> |  |  |
| timeout | <code>number</code> |  | how long algorythm should run. default=graph.nodes().length * 10 [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2) |

<a name="LoadGEXF"></a>

## LoadGEXF
LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

<a name="new_LoadGEXF_new"></a>

### new LoadGEXF(path, onGraphLoaded)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path to the GEXF file |
| onGraphLoaded | <code>function</code> | Optional callback for graph update [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher) |

<a name="LoadJSON"></a>

## LoadJSON
LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

<a name="new_LoadJSON_new"></a>

### new LoadJSON(path, onGraphLoaded)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path to the JSON file |
| onGraphLoaded | <code>function</code> | Optional callback for graph update [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher) |

<a name="NOverlap"></a>

## NOverlap
NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

<a name="new_NOverlap_new"></a>

### new NOverlap([nodeMargin], [scaleNodes], [gridSize], [permittedExpansion], speed, maxIterations, easing, duration)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeMargin] | <code>number</code> | <code>5</code> | additional minimum space to apply around each and every node |
| [scaleNodes] | <code>number</code> | <code>1.2</code> | multiplier,  larger nodes will have more space around |
| [gridSize] | <code>number</code> | <code>20</code> | number of rows and columns to use when dividing the nodes up into cell |
| [permittedExpansion] | <code>number</code> | <code>1.1</code> | maximum ratio to apply to the bounding box |
| speed | <code>number</code> |  | larger value increases the speed at the cost of precision |
| maxIterations | <code>number</code> |  | iterations to run the algorithm for before stopping it |
| easing | <code>number</code> |  | camera easing type for camera transition |
| duration | <code>number</code> |  | duration of the transition for the easing method It accepts all the parameters of sigma.layout.noverlap plugin described on its github page: [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.noverlap) |

**Example**  
```js
<Sigma graph={data}>
 <NOverlap gridSize={10} maxIterations={100}/>
</Sigma>
```
<a name="NeoCypher"></a>

## NeoCypher
NeoCypher component, interface for neo4j.cypher sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

<a name="new_NeoCypher_new"></a>

### new NeoCypher(url, user, password, query, producers, onGraphLoaded)

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Neo4j instance REST API URL |
| user | <code>string</code> | Neo4j instance REST API user |
| password | <code>string</code> | Neo4j instance REST API password |
| query | <code>string</code> | Neo4j cypher query |
| producers | <code>NeoGraphItemsProducers</code> | Optional transformer for creating Sigma nodes and edges,                                      instance compatible with NeoGraphItemsProducers |
| onGraphLoaded | <code>function</code> | Optional callback for graph update [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher) |

<a name="NodeShapes"></a>

## NodeShapes
NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

Extra node properties:
 - node.type='shape-name' - node shape renderer e.g. node.type='cross'.
 - node.borderColor - e.g. node.borderColor='#FF3333'
Details on shapes configuration and possibility to apply images to nodes, please refer to
[plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images).

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

<a name="new_NodeShapes_new"></a>

### new NodeShapes(default)

| Param | Type | Description |
| --- | --- | --- |
| default | <code>string</code> | set default sigma node renderer to be applied to nodes where type is not set |

**Example**  
```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<NodeShapes default="star"/>
</Sigma>
```
**Example**  
Supported shapes
```
type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";
```
<a name="RandomizeNodePositions"></a>

## RandomizeNodePositions
RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

<a name="RelativeSize"></a>

## RelativeSize
RelativeSize component, interface for RelativeSize sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Sets nodes sizes corresponding its degree.

<a name="new_RelativeSize_new"></a>

### new RelativeSize(initialSize)

| Param | Type | Description |
| --- | --- | --- |
| initialSize | <code>number</code> | start size for every node, will be multiplied by Math.sqrt(node.degree) |

<a name="Sigma"></a>

## Sigma
**Signature**: `<Sigma graph={graph} settings={settings} onClickNode={func}.../>`  
Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for network graphs.
Sigma makes it easy to publish networks on Web pages, and allows developers to integrate network exploration in
rich Web applications.

Can be composed with sigma sub-components using JSX syntax
```
<Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
       settings={{drawEdges:false}}
       onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
       graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
  <RelativeSize initialSize={8}/>
</Sigma>
```

Parameter types
```
type Sigma$Event = {
  data: {
    node?: Neo4j$Node,
    edge?: Neo4j$Edge,
    captor: {
      clientX: number,
      clientY: number
}}}

type Sigma$EventHandler = (node:Sigma$Event) => void

type Sigma$Graph$Data = {
  nodes: [Sigma$Node],
  edges: [Sigma$Edge]
};

type Sigma$Node = {
  id: string,
  label?: string,
  x?: number,
  y?: number,
  size?: number,
  color?: color
};

type Sigma$Edge = {
  id: string,
  source: string,
  target: string,
  label?: string,
  color?: color
};
```


* [Sigma](#Sigma)

    * [new Sigma(style, settings, renderer, graph, onClickNode, onOverNode, onOutNode, onClickEdge, onOverEdge, onOutEdge)](#new_Sigma_new)

    * [.bindHandlers()](#Sigma.bindHandlers)


<a name="new_Sigma_new"></a>

### new Sigma(style, settings, renderer, graph, onClickNode, onOverNode, onOutNode, onClickEdge, onOverEdge, onOutEdge)

| Param | Type | Description |
| --- | --- | --- |
| style | <code>CSS</code> | CSS style description for main div holding graph, should be specified in React format |
| settings | <code>Sigma$Settings</code> | js object with sigma initialization options, for full list see [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings) |
| renderer | <code>string</code> | can be "webgl" or "canvas" |
| graph | <code>Sigma$Graph$Data</code> | js object with array of nodes and edges used to initialize sigma |
| onClickNode | <code>Sigma$EventHandler</code> | set sigma callback for "clickNode" event (see below) |
| onOverNode | <code>Sigma$EventHandler</code> | set sigma callback for "overNode" event |
| onOutNode | <code>Sigma$EventHandler</code> | set sigma callback for "outNode" event |
| onClickEdge | <code>Sigma$EventHandler</code> | set sigma callback for "clickEdge" event |
| onOverEdge | <code>Sigma$EventHandler</code> | set sigma callback for "overEdge" event |
| onOutEdge | <code>Sigma$EventHandler</code> | set sigma callback for "outEdge" event |

<a name="Sigma.bindHandlers"></a>

### *Sigma*.bindHandlers()
Sigma callback receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
  with the following structure (see Sigma$Event type under /types/sigma.js):
  ````
  .data
     .captor   -- information about event handler, for instance position on the page {clientX, clientY}
     .node?     -- for node events is sigma node data
     .edge?     -- for edge events is sigma edge data
  ````

<a name="SigmaEnableWebGL"></a>

## SigmaEnableWebGL()
Component enables WebGL renderer, setting it as default renderer if WebGL is supported by browser.


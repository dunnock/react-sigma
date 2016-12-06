// @flow

import React from 'react'
import sigma from '../sigma/main'
import { embedProps } from './tools'


type Props = {
  settings: Sigma$Settings,
  renderer?: "webgl" | "canvas",
  style?: CSS,
  children?: mixed,
  graph?: Sigma$Graph$Data,
  onClickNode?: (e: Sigma$Event) => void,
  onClickEdge?: (e: Sigma$Event) => void,
  onOverNode?: (e: Sigma$Event) => void,
  onOutNode?: (e: Sigma$Event) => void,
  onOverEdge?: (e: Sigma$Event) => void,
  onOutEdge?: (e: Sigma$Event) => void,
  onClickStage?: (e: Sigma$Event) => void,  // TODO: sigmaevent type
};
type DefaultProps = {
  settings: Sigma$Settings
};
type State = {
  renderer: boolean
};


/**

Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for linked graphs.
Sigma is a fastest JavaScript library dedicated to graph drawing. It makes easy to publish networks on
Web pages, and allows developers to integrate network exploration in rich Web applications.

Can be composed with sigma sub-components using JSX syntax, e.g.:

@example
<Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
       settings={{drawEdges:false}}
       onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
       graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
  <RelativeSize initialSize={8}/>
</Sigma>

@param {CSS} style   CSS style description for main div holding graph, should be specified in React format
@param {Sigma$Settings} settings     js object with sigma initialization options
                as described on [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings)
@param {string} renderer     can be "webgl" or "canvas"
@param {Sigma$Graph$Data} graph   js object with array of nodes and edges used to initialize sigma
@param {Sigma$EventHandler} onClickNode      set sigma callback for "clickNode" event (see below)
@param {Sigma$EventHandler} onOverNode      set sigma callback for "overNode" event
@param {Sigma$EventHandler} onOutNode      set sigma callback for "outNode" event
@param {Sigma$EventHandler} onClickEdge     set sigma callback for "clickEdge" event
@param {Sigma$EventHandler} onOverEdge      set sigma callback for "overEdge" event
@param {(Sigma$EventHandler} onOutEdge      set sigma callback for "outEdge" event

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
```

### Callbacks:

 Sigma callback receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
 with the following structure (see Sigma$Event type under /types/sigma.js):
 ````
  .data
     .captor   -- information about event handler, for instance position on the page {clientX, clientY}
     .node?     -- for node events is sigma node data
     .edge?     -- for edge events is sigma edge data
 ````

### Types

All defined Sigma types stored under /types/sigma.js, can be used as a reference for objects and parameters.

## Extending sigma components

 Sigma container will mount any child component with sigma instance under props.sigma. This way sigma
 functionality may be extended indefinitely:

````
call MyCustomSigma extends React.Component {
  constructor(props) {
    super(props)
    props.sigma.graph.addNode({id:"n3", label:props.label});
  }
}
...
<Sigma>
  <MyCustomSigma label="Label">
</Sigma>
````

### Asynchronous graph data loading

 Component which initializes asynchronously is supposed to mount its children only after initialized
 (for example LoadJSON), which makes possible to build sequential composition in the pure JSX without
 any callbacks or handlers. In the following example RelativeSize will be counted only after loading
 from arctic.json file.


````
<Sigma>
  <LoadJSON url="/arctic.json">
    <RelativeSize initialSize={8}/>
  </LoadJSON>
</Sigma>
````


**/


class Sigma extends React.PureComponent {
  props: Props;
  state: State;
  sigma: sigma;
  sigmaRenderer: ?string;
  plugins: mixed;
  initRenderer: (container: HTMLElement) => void;

  static defaultProps: DefaultProps = {
    settings: {
      defaultNodeColor: "#3388AA",
      defaultLabelSize: 8,
      defaultLabelColor: "#777",
      labelThreshold: 12,
      hoverFontStyle: "text-size: 11",
      batchEdgesDrawing: true,
      drawEdges: true,
      drawEdgeLabels: false
    },
    style: {
      maxWidth: "inherit",
      height: "400px"
    }
  }

  constructor(props: Props) {
    super(props);
    this.state = {renderer:false}
    let settings = this.props.settings ? this.props.settings : {}
    this.sigma = new sigma({settings})
    this.initRenderer = this.initRenderer.bind(this)
    Sigma.bindHandlers(this.props, this.sigma)
    if(this.props.graph)
      this.sigma.graph.read(this.props.graph)
  }

  initRenderer(container: HTMLElement) {
    if(container) {
      let options: Object = {container}
      if(this.props.renderer)
        options.type = this.props.renderer
      this.sigmaRenderer = this.sigma.addRenderer(options)
      this.sigma.refresh()
      this.setState({renderer:true})
    } else if(this.sigmaRenderer) {
      this.sigma.killRenderer(this.sigmaRenderer)
      this.sigmaRenderer = null
      this.setState({renderer:false})
    }
  }

  componentWillUnmount() {
    this.sigma.kill()
    this.sigmaRenderer = null
  }

  render() {
    let children = this.state.renderer ? embedProps(this.props.children, {sigma: this.sigma}) : null
    return <div ref={this.initRenderer} style={this.props.style}>
          { children }
        </div>
  }

  static bindHandlers(handlers, sigma) {
    ["clickNode", "overNode", "outNode", "clickEdge", "overEdge", "outEdge", "clickStage"].forEach(
      event => {
          let handler = "on" + event[0].toUpperCase() + event.substr(1);
          if (handlers[handler]) {
            sigma.bind(event, handlers[handler])
          }
        } );
  }
}

export default Sigma;

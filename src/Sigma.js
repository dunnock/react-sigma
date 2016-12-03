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


/**

Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for linked graphs.
Sigma is a fastest JavaScript library dedicated to graph drawing. It makes easy to publish networks on
Web pages, and allows developers to integrate network exploration in rich Web applications.

Can be composed with sigma sub-components using JSX syntax, e.g.:

````
    <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
           settings={{drawEdges:false}}
           onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
           graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
      <RelativeSize initialSize={8}/>
    </Sigma>
````

## Parameters:

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
return  <Sigma>
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
    } else if(this.sigmaRenderer) {
      this.sigma.killRenderer(this.sigmaRenderer)
      this.sigmaRenderer = null
    }
  }

  componentWillUnmount() {
    this.sigma.kill()
    this.sigmaRenderer = null
  }

  render() {
    return <div ref={this.initRenderer} style={this.props.style}>
          { embedProps(this.props.children, {sigma: this.sigma}) }
        </div>;
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

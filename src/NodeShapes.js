// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/nodes'

type Props = {
	default?: Sigma$Node$Shapes,
	sigma?: sigma
};

/**

NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

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

**/

class NodeShapes extends React.Component {
	props: Props;

	constructor(props: Props) {
		super(props)
		if(this.props.sigma && this.props.default)
			this.props.sigma.settings({defaultNodeType:this.props.default})
	}

	render = () => null
}

export default NodeShapes;


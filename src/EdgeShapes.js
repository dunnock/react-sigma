// @flow

import React from 'react'
import '../sigma/edges'

type Props = {
	default?: Sigma$Edge$Shapes,
	sigma?: Sigma
};

/**

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

@param {string} default  set default sigma edge to be applied to edges where type is not set

**/

class EdgeShapes extends React.Component<Props> {
	constructor(props: Props) {
		super(props)
		if(this.props.sigma && this.props.default)
			this.props.sigma.settings({defaultEdgeType:this.props.default})
	}

	render = () => null
}

export default EdgeShapes;

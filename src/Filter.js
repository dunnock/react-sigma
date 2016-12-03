// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/plugins.filter'
//import { embedProps } from './tools'

type Props = {
	nodesBy?: Nodes$Filter,
	neighborsOf?: string,
	sigma?: sigma
};

/**

Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

Parameters:
 - @nodesBy   Nodes$Filter   will hide nodes where filter returns false

type Nodes$Filter = (node: Sigma$Node) => boolean;


**/

class Filter extends React.Component {
	props: Props;
	filter: Object;

	componentDidMount() {
		this.filter = new sigma.plugins.filter(this.props.sigma)
		this._apply(this.props)
	}

	// TODO: will it work in composition with ForceAtlas for instance?
	//It should hide nodes before rendering of subplugins, therefore used in componentWillUpdate.. is it right?
	componentWillUpdate(props: Props) {
		if(props.nodesBy!==this.props.nodesBy || props.neighborsOf!==this.props.neighborsOf)
			this._apply(props)
	}

	// TODO: Composition is not working yet!!
	render = () => null

	_apply(props: Props) {
		this.filter.undo(["neighborsOf", "nodesBy"])
		if(props.neighborsOf) {
			this.filter.neighborsOf(props.neighborsOf, "neighborsOf")
		}
		if(props.nodesBy)
			this.filter.nodesBy(props.nodesBy, "nodesBy")
		this.filter.apply()
		if(this.props.sigma)
			this.props.sigma.refresh();
	}
}

export default Filter;

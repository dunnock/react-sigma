// @flow

import React from 'react'
import sigma from '../sigma/main'
import 'sigma/build/plugins/sigma.layout.forceAtlas2.min.js'

type State = {
	running: boolean,
	timer?: number,
	drawEdges: ?boolean
};

type Props = {
	worker?: boolean,
	barnesHutOptimize?: boolean,
	barnesHutTheta?: number,
	adjustSizes?: boolean,
	iterationsPerRender?: number,
	linLogMode?: boolean,
	outboundAttractionDistribution?: boolean,
	edgeWeightInfluence?: number,
	scalingRatio?: number,
	strongGravityMode?: boolean,
	slowDown?: number,
	gravity?: number,
	timeout?: number,
	sigma?: sigma
};

/**

ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

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

**/


class ForceAtlas2 extends React.Component {
	state: State;
	props: Props;

	constructor(props: Props) {
		super(props)
		this.state = {running:false}
	}

	componentDidMount() {
		this._refreshGraph()
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if(prevState.running && !this.state.running && this.props.sigma) {
			this.props.sigma.stopForceAtlas2()
			this.props.sigma.settings({drawEdges:prevState.drawEdges===false ? false : true})
			this.props.sigma.refresh();
		}
	}

	componentWillUnmount() {
		if(this.props.sigma) this.props.sigma.killForceAtlas2()
		if(this.state.timer) clearTimeout(this.state.timer)
	}

	render = () => null


	_refreshGraph() {
		let s = this.props.sigma
		if(!sigma || !s) return

		let drawEdges = s.settings("drawEdges")
		if(s.graph.edges().length > 1000)
				s.settings({drawEdges: false})

		s.startForceAtlas2(this._stripOptions(this.props));
		// TODO: convert running status to state
		let timer = setTimeout(() => {
					this.setState({running:false, timer:undefined})
				}, this.props.timeout || s.graph.nodes().length*8 );
		this.setState({running:true, timer, drawEdges})
	}

	//strip force atlas options from component props
	_stripOptions(props: Props): Props {
		return Object.assign({}, props, {sigma: undefined})
	}

}

export default ForceAtlas2;

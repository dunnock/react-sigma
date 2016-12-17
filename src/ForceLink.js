// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/layout.forceLink'

type State = {
	running: boolean,
	timer?: number,
	drawEdges?: ?boolean
};

type Props = {
	barnesHutOptimize?: boolean,
	barnesHutTheta?: number,
	adjustSizes?: boolean,
	iterationsPerRender?: number,
	linLogMode: boolean,
	outboundAttractionDistribution?: boolean,
	edgeWeightInfluence?: number,
	scalingRatio?: number,
	strongGravityMode?: boolean,
	slowDown?: number,
	gravity?: number,
	alignNodeSiblings?: boolean,
	nodeSiblingsScale?: number,
	nodeSiblingsAngleMin?: number,
	worker: boolean,
	background?: boolean,
	easing?: Sigma$Easing,
	randomize?: "globally" | "locally" | "no",
	timeout?: number,
	sigma?: sigma
};

type DefaultProps = {
	worker: boolean,
	linLogMode: boolean
};

/**

ForceLink component, starts Force Atlas2 algorythm once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of ForceLink described on its github page:
@param {boolean} barnesHutOptimize  Use the algorithm's Barnes-Hut to improve repulsion's scalability
									This is useful for large graph but harmful to small ones.
@param {number} barnesHutTheta
@param {boolean} adjustSizes
@param {number} iterationsPerRender
@param {boolean} [linLogMode=true]
@param {boolean} outboundAttractionDistribution
@param {number} edgeWeightInfluence
@param {number} scalingRatio
@param {boolean} strongGravityMode
@param {number} gravity
@param {boolean} alignNodeSiblings
@param {number} nodeSiblingsScale
@param {number} nodeSiblingsAngleMin
@param {boolean} [worker=true]  Use a web worker to run calculations in separate thread
@param {boolean} background
@param {string} easing  Easing mode
@param {"globally"|"locally"} randomize  Randomize node positions before start
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.forceLink)

**/


class ForceLink extends React.Component {
	state: State;
	props: Props;
	static defaultProps: DefaultProps = {
		worker: true,
		linLogMode: true
	}

	constructor(props: Props) {
		super(props)
		this.state = {running:false}
	}

	componentDidMount() {
		this._refreshGraph()
	}

	// Change sigma status only after react rendering complete
	componentDidUpdate(prevProps: Props, prevState: State) {
		let s = this.props.sigma
		if(prevState.running && !this.state.running && s) {
			this._stopForceLink()
			s.refresh();
		} else if (ForceLink._propsChanged(prevProps, this.props)) {
			this._stopForceLink()
			this._refreshGraph()
		}
	}

	componentWillUnmount() {
		this._stopForceLink()
	}

	//TODO: Add composition of child components after timeout
	render = () => null

  _stopForceLink() {
		sigma.layouts.stopForceLink()
		if(this.state.timer) clearTimeout(this.state.timer)
		if(this.props.sigma && this.props.sigma.settings) this.props.sigma.settings({drawEdges:this.state.drawEdges})
  }

	_refreshGraph() {
		let s = this.props.sigma
		if(!sigma || !s) return

		let drawEdges = s.settings("drawEdges")
		if(s.graph.edges().length > 1000)
				s.settings({drawEdges: false})

		sigma.layouts.configForceLink(s, ForceLink._stripOptions(this.props))
		sigma.layouts.startForceLink(s)
		// TODO: convert running status to state
		let timer = setTimeout(() => {
					this.setState({running:false, timer:undefined})
				}, this.props.timeout || s.graph.nodes().length*8 );
		this.setState({running:true, timer, drawEdges})
	}

	//strip force atlas options from component props
	static _stripOptions(props: Props) {
		return Object.assign({}, props, {sigma: undefined})
	}

	static _propsChanged(prev: Props, next: Props) {
		for(let key in prev)
			if(prev[key] !== next[key])
				return true
		return false
	}
}

export default ForceLink;

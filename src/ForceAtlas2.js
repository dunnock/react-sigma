// @flow

import React from 'react'
import '../sigma/layout.forceAtlas2'
import { embedProps } from './tools'

type State = {
	running: boolean,
	timer?: number,
	drawEdges?: ?boolean
};

type Props = {
	worker: boolean,
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
	timeout?: number,
	sigma?: sigma
};

type DefaultProps = {
	worker: boolean,
	linLogMode: boolean
};

/**

ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of ForceAtlas2 described on its github page:
@param {boolean} [worker=true]           Use a web worker to run calculations in separate thread
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
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2)

**/


class ForceAtlas2 extends React.Component {
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

	componentDidUpdate(prevProps: Props, prevState: State) {
		let s = this.props.sigma
		if(prevState.running && !this.state.running && s) {
				s.stopForceAtlas2()
				s.settings({drawEdges:prevState.drawEdges===false ? false : true})
				s.refresh();
		}
	}

	componentWillUnmount() {
		if(this.props.sigma) this.props.sigma.killForceAtlas2()
		if(this.state.timer) clearTimeout(this.state.timer)
	}

	render() {
        if (!this.state.running) {
            return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>;
        }
        return null;
    }


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
        return Object.assign({}, props, {
            sigma: undefined, 
            children: undefined
        })
    }

}

export default ForceAtlas2;

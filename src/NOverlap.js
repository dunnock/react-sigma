// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/plugins.animate'
import '../sigma/layout.noverlap'

type State = {
	running: boolean,
	drawEdges?: ?boolean
};


type Props = {
	nodes?: Array<Sigma$Node>,
	nodeMargin?: number,
	scaleNodes?: number,
	gridSize?: number,
	permittedExpansion?: number,
	speed?: number,
	maxIterations?: number,
	easing?: "linearNone" | "quadraticIn" | "quadraticOut" | "quadraticInOut" | "cubicIn" | "cubicOut" | "cubicInOut",
	duration?: number,
	sigma?: sigma
};

/**

NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

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

**/


class NOverlap extends React.Component {
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
		if(prevState.running && !this.state.running) {
			if(this.props.sigma)
				this.props.sigma.settings({drawEdges:prevState.drawEdges || true})
			if(this.props.sigma)
				this.props.sigma.refresh()
		}
	}

	render = () => null

	_refreshGraph() {
		let s = this.props.sigma
		if(!sigma || !s) return

		let drawEdges = s.settings("drawEdges")
		if(s.graph.edges().length > 1000)
				s.settings({drawEdges: false})

		let listener = s.configNoverlap(this._stripOptions(this.props))

		listener.bind('stop', () => {
				this.setState({running:false}) } )

		this.setState({running:true, drawEdges})

		s.startNoverlap()
	}

	//strip noverlap options from component props
	_stripOptions(props: Props): Props {
		return Object.assign({}, props, {sigma: undefined})
	}
}

export default NOverlap;

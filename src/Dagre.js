// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/layout.dagre'

type State = {
	running: boolean,
	timer?: number
};

type Props = {
	directed?: boolean,
	multigraph?: boolean,
	compound?: boolean,
	rankDir?: "TB" | "BT" | "RL" | "LR",
	easing?: Sigma$Easing,
	sigma?: sigma
};


/**

Dagre layout algorythm.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of Dagre described on its github page:
@param {string} easing  Easing mode

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.dagre)

**/


class Dagre extends React.Component {
	state: State;
	props: Props;

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
			this._stopDagre()
			s.refresh();
		} else if (Dagre._propsChanged(prevProps, this.props)) {
			this._stopDagre()
			this._refreshGraph()
		}
	}

	componentWillUnmount() {
		this._stopDagre()
	}

	//TODO: Add composition of child components after timeout
	render = () => null

  _stopDagre() {
		sigma.layouts.stopDagre()
  }

	_refreshGraph() {
		let s = this.props.sigma
		if(!sigma || !s) return

		sigma.layouts.configDagre(s, Dagre._stripOptions(this.props))
		sigma.layouts.startDagre(s)
		// TODO: convert running status to state

		this.setState({running:true})
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

export default Dagre;

// @flow

import React from 'react'
import sigma from '../sigma/main'
import * as Utils from './Utils'

type State = {
	running: boolean
};

type Props = {
	config: (sigma: sigma, config: KeyValueObject) => null,
	start: (sigma: sigma) => null,
	stop: () => null,
	sigma?: sigma
};


/**

ReactSigmaLayoutPlugin is a base class for sigma plugins.

Usage
```
const Dagre = (props) =>
        <ReactSigmaLayoutPlugin
              start={sigma.layouts.dagre.start}
              config={sigma.layouts.dagre.configure}
              stop={() => console.warn("dagre stop not implemented")} />
...
<Dagre/>
```
**/


class ReactSigmaLayoutPlugin extends React.Component {
	state: State;
	props: Props;

	constructor(props: Props) {
		super(props)
		this.state = {running:false}
	}

	componentDidMount() {
		this._start()
	}

	// Change sigma status only after react rendering complete
	componentDidUpdate(prevProps: Props, prevState: State) {
		if(prevState.running && !this.state.running) {
			this.props.stop()
			if(this.props.sigma) this.props.sigma.refresh();
		} else if (Utils.propsChanged(prevProps, this.props)) {
			this.props.stop()
			this._start()
		}
	}

	componentWillUnmount() {
		this.props.stop()
	}

	//TODO: Add composition of child components after timeout
	render = () => null

	_start() {
		let s = this.props.sigma
		if(!sigma || !s) return

		this.props.config(s, ReactSigmaLayoutPlugin._stripOptions(this.props))
		this.props.start(s)

		this.setState({running:true})
	}

	static _stripOptions(props: Props) {
		let config = {}
		for(let key in props) 
			if(key!=="start" && key!=="stop" && key!=="config" && key!=="sigma" && key!=="children")
				config[key] = props[key]
		return config
	}
}


export default ReactSigmaLayoutPlugin;

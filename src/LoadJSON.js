// @flow

import React from 'react'
import sigma from '../sigma/main'
import '../sigma/parsers.json.js'
import { embedProps } from './tools'

type State = {
    loaded: boolean
};
type Props = {
	path: string,
    onGraphLoaded?: () => void,
    children?: mixed,
    sigma?: sigma
};


// TODO: make a superclass for loaders??

/**

LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

 @param {string} path   path to the JSON file
 @param {Function} onGraphLoaded        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/


class LoadJSON extends React.PureComponent {
    state: State;
	props: Props;
    onLoad: () => void;

    constructor(props: Props) {
        super(props)
        this.state = {loaded:false}
        this.onLoad = this._onLoad.bind(this)
    }

	componentDidMount() {
		this._load(this.props.path)
	}

	componentWillReceiveProps(props: Props) {
		// reload only if path changes
		if(this.props.path !== props.path) {
            this.setState({loaded:false})
			this._load(props.path)
        }
	}

	render() {
        if(!this.state.loaded)
            return null
        return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
    }


    _load(url: string) {
        sigma.parsers.json(
                this.props.path ,
                this.props.sigma ,
                this.onLoad
        )
    }

    _onLoad() {
        if(this.props.sigma)
            this.props.sigma.refresh()
        this.setState({loaded:true})
        if(this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

}

export default LoadJSON;


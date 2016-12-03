// @flow

import React from 'react'
import sigma from '../sigma/main'
import { embedProps } from './tools'

type Props = {
    children?: mixed,
    sigma?: sigma
};


/**

LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

Parameters:
 - @path       string   path to the JSON file
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/


class RandomizeNodePositions extends React.PureComponent {
	props: Props;

    constructor(props: Props) {
        super(props)
        this.props.sigma &&
            this.props.sigma.graph.nodes().forEach(n => {
                n.x = Math.random()
                n.y = Math.random()
            } )
    }

	render() {
        return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
    }

}

export default RandomizeNodePositions;


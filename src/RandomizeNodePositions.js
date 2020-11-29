// @flow

import React from 'react'
import { embedProps } from './tools'

const randomSeed = Math.random() * 10001

type Props = {
  children?: mixed,
  sigma?: sigma,
  seed?: number
}

/**

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

**/


class RandomizeNodePositions extends React.PureComponent<Props> {
  constructor( props: Props ) {
    super( props )

    let initSeed
    if ( this.props.seed != null ) {
      initSeed = this.props.seed
    } else {
      initSeed = Math.floor( Math.random() * 100001 )
    }
    this.state = {
      seed: initSeed
    }
    if ( this.props.sigma ) {
      this.props.sigma.graph.nodes().forEach( ( n, idn ) => {
        console.log( this.random() )
        n.x = this.random()
        n.y = this.random()
      } )
    }
    if ( this.props.sigma ) this.props.sigma.refresh()
  }

  random() {
    let s = Math.sin( this.state.seed++ ) * 10000
    return s - Math.floor( s )
  }

  componentDidMount() {
    if ( this.props.sigma ) this.props.sigma.refresh()
  }

  render() {
    return <div>{embedProps( this.props.children, { sigma: this.props.sigma } )}</div>
  }

}

export default RandomizeNodePositions

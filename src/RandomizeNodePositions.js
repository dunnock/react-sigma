// @flow

import React from 'react'
import { embedProps } from './tools'

type Props = {
  children?: mixed,
  sigma?: sigma
};


/**

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

**/


class RandomizeNodePositions extends React.PureComponent {
  props: Props;

  constructor(props: Props) {
    super(props)
    if(this.props.sigma) {
      this.props.sigma.graph.nodes().forEach(n => {
        n.x = Math.random()
        n.y = Math.random()
      } )
    }
    if(this.props.sigma) this.props.sigma.refresh()
  }

  componentDidMount() {
    if(this.props.sigma) this.props.sigma.refresh()
  }

  render() {
    return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
  }

}

export default RandomizeNodePositions;

import React from 'react'
import { Sigma, LoadJSON, Filter, ForceAtlas2, RelativeSize, RandomizeNodePositions } from '../src/index';

class FilteredSample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedNode: null}
  }

  render() {
    return <div style={{fontFamily:"sans-serif", fontSize:"small"}}>
     *Click on node to see only its neighbours. Click on stage to see all nodes. Renderer: WebGL, 12k nodes, 30k edges.
     <Sigma renderer="webgl" settings={{drawEdges:false}} onClickNode={ e => this.setState({selectedNode: e.data.node.id}) } onClickStage={ e => this.setState({selectedNode: null}) }>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/sites_nocoords.json"}>
        <RandomizeNodePositions>
          <Filter neighborsOf={ this.state.selectedNode } />
          <ForceAtlas2 barnesHutOptimize barnesHutTheta={0.8} iterationsPerRender={2}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
    </div>
  }
}

export default FilteredSample;

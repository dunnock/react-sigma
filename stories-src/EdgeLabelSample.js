import React from 'react'
import { Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes, ForceAtlas2 } from '../src/index';

class EdgeLabelSample extends React.Component {

  render() {

    let graph = {
      nodes: [
        {id: 'a', label: 'A'},
        {id: 'b', label: 'B'},
        {id: 'c', label: 'C'}
      ],
      edges: [
        {id: 'a_to_b', source: 'a', target: 'b', label: 'A -> B' },
        {id: 'b_to_c', source: 'b', target: 'c', label: 'B -> C' },
        {id: 'c_to_a', source: 'c', target: 'a', label: 'C -> A' },
        {id: 'b_to_a', source: 'b', target: 'a', label: 'B -> A' }
      ]
    };

    return <div>
        <Sigma renderer="canvas" graph={graph} settings={{ drawEdges: true, drawEdgeLabels: true}}>
          <EdgeShapes default="curvedArrow"/>
          <RandomizeNodePositions>
            <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
            <RelativeSize initialSize={15}/>
          </RandomizeNodePositions>
        </Sigma>
      </div>
  }
}

export default EdgeLabelSample;

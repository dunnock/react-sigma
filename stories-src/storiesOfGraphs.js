import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { withKnobs, object, boolean, number, select } from '@storybook/addon-knobs';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, ForceAtlas2, RelativeSize, NOverlap, SigmaEnableWebGL, RandomizeNodePositions } from '../src/index';
import ForceLink from '../src/ForceLink';
import {Note} from './style.js';


const sigmaAction = decorateAction([
  args => [{type: args[0].type,  data: {node: args[0].data.node, captor: args[0].data.captor} }]
]);

storiesOf('Complex graph samples', module)
  .addDecorator(withKnobs)
  .addWithInfo('Medium graph animated',
              'Load medium size graph (~2k nodes) with coords and colors, then run RelativeSize and ForceLink (ForceAtlas2) layout precalculated in background with cubicInOut easing. WebGL rendering. Roll over graph node to see event data.',
              () => {
    let flTimeout = number("Timeout", 2000)
    let flBackground = boolean("Force layout in backround", true)
    let flEasing = select("Easing after layout", ["linearNone", "cubicIn", "cubicOut", "cubicInOut"], "cubicInOut")
    let flOutboundAttractionDistribution = boolean("Outbound attraction distribution", false)
    let flBarnesHutOptimize = boolean("Barneshut optimize", false)
    let flBarnesHutTheta = number("Barneshut theta", 0.5)
    let flGravity = number("Gravity", 1)
    let flEdgeWeightInfluence = number("Edge weight influence", 0)
    let flAlignNodeSiblings = boolean("Align node siblings", false)
    let flRandomize = select("Randomize node positions", ["locally", "globally", "no"], "locally")
    return <div style={Note}>
        Play with ForceLink settings under <b>knobs</b>. Check overNode events under <b>action logger</b>.
        <Sigma renderer="webgl" onOverNode={ sigmaAction('onOverNode') } settings={{animationsTime:3000}}>
          <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
            <ForceLink randomize={flRandomize}
                      barnesHutOptimize={flBarnesHutOptimize}
                      barnesHutTheta={flBarnesHutTheta}
                      background={flBackground}
                      easing={flEasing}
                      gravity={flGravity}
                      edgeWeightInfluence={flEdgeWeightInfluence}
                      alignNodeSiblings={flAlignNodeSiblings}
                      timeout={flTimeout}
                      outboundAttractionDistribution={flOutboundAttractionDistribution}/>
            <RelativeSize initialSize={15}/>
          </LoadGEXF>
        </Sigma>
    </div>
  })

  .addWithInfo('Big static',
              'Render big graph (12k nodes) with predefined size and coordinates, see https://dunnock.github.io/react-sigma/sites_coords.json. Canvas rendering. Click on graph node to see event data.', () => (
    <Sigma renderer="canvas" onClickNode={ sigmaAction('onClickNode') }>
      <NodeShapes default="diamond"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/sites_coords.json"}/>
    </Sigma>
  ))

  .addWithInfo('Big graph animated',
              'Load big graph (12k nodes, 30k edges), randomize coords and set relative node sizes, then run ForceAtlas2 algorythm with realtime calculation animation with barnesHutOptimize option, see https://dunnock.github.io/react-sigma/sites_nocoords.json. WebGL rendering. Click on graph node to see event data.',
              () => (
    <Sigma renderer="webgl" settings={{drawEdges:false}} onClickNode={ sigmaAction('onClickNode') }>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/sites_nocoords.json"}>
        <RandomizeNodePositions>
          <ForceAtlas2 barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={3}/>
          <RelativeSize initialSize={8}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))

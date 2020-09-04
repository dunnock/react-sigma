import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, boolean, object, select } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, RandomizeNodePositions, DragNodes } from '../src/index';
import ForceLink from '../src/ForceLink';
import FilteredSample from './FilteredSample';
import EdgeLabelSample from './EdgeLabelSample';
import Dagre from '../src/Dagre'
import { Note } from './style.js';

const sigmaAction = decorateAction([
  args => [{type: args[0].type,  data: {node: args[0].data.node, captor: args[0].data.captor} }]
]);

storiesOf('Plugins', module)
  .addDecorator(withKnobs)
  .add('NOverlap', () => (
    <Sigma renderer="canvas" settings={{hideEdgesOnMove:false}}>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))
  .add('NodeShapes and EdgeShapes',
          () => (
      <Sigma renderer="canvas">
        <EdgeShapes default="dashed"/>
        <NodeShapes default="diamond"/>
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        </LoadJSON>
      </Sigma>
    ),
    {info: 'Render graph with dashed edges and diamond nodes.  Node and Edge shapes can be customized per node, using .type property, please see https://github.com/dunnock/react-sigma/blob/master/DOCS.md#edgeshapes for details.'}
  )
  .add('RelativeSize', () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="dotted"/>
      <NodeShapes default="equilateral"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/geolocalized.json"}>
        <RandomizeNodePositions>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))
  .add('Force atlas 2',
          () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RandomizeNodePositions>
          <ForceAtlas2 iterationsPerRender={1} timeout={6000}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
    ),
    {info: 'Animate graph with randomized coordinates and relative node sizes running ForceAtlas2, see https://dunnock.github.io/react-sigma/upwork.json.  Click on graph node to see event data.'}
  )
  .add('Force Link',
          () => (
    <Sigma renderer="canvas" settings={{hideEdgesOnMove:false, animationsTime:3000}}>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="diamond"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RandomizeNodePositions>
          <ForceLink iterationsPerRender={1} background={true} easing="cubicInOut" timeout={1000}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
    ),
    {info: 'Animate graph with randomized coordinates and relative node sizes running ForceAtlas2, it is extended version of ForceAtlas2. Click on graph node to see event data.'}
  )
  .add('Dagre',
          () => {
    let directed = boolean("directed", true)
    let multigraph = boolean("multigraph", true)
    let compound = boolean("compound", true)
    let boundingBox = object("boundingBox", {minX:0, maxX:10, minY:0, maxY:10})
    let rankDir = select("rankDir", ["TB","BT","RL","LR"], "TB")
    let easing = select("Easing after layout", ["linearNone", "cubicIn", "cubicOut", "cubicInOut"], "cubicInOut")
    return <Sigma renderer="canvas" settings={{hideEdgesOnMove:false, animationsTime:3000}}>
      <EdgeShapes default="curved"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RandomizeNodePositions>
          <Dagre directed={directed} multigraph={multigraph} compound={compound} boundingBox={boundingBox} rankDir={rankDir} easing={easing}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
    },
    {info: 'Apply Dagre layout to the site tree, source: https://github.com/cpettitt/dagre/wiki#recommended-reading'}
  )
  .add('Filter', () => ( <FilteredSample/>))
  .add('Edge Labels', () => ( <EdgeLabelSample />))
  .add('Drag Nodes', () => {
    return (
      <div style={Note}>
      Click on nodes to drag. Check node events under the <strong>actions</strong> tab.
      <Sigma renderer="canvas">
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
          <RandomizeNodePositions>
            <DragNodes
              onStartdrag={ sigmaAction('onStartdrag') }
              onDrag={ sigmaAction('onDrag') }
              onDrop={ sigmaAction('onDrop') }
              onDragend={ sigmaAction('onDragend') } />
          </RandomizeNodePositions>
        </LoadJSON>
      </Sigma>
    </div>)
  },
  {info: 'Adjust the position of nodes in the graph by drag-and-drop.'}
  )

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, boolean, object, select } from '@storybook/addon-knobs';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, RandomizeNodePositions } from '../src/index';
import ForceLink from '../src/ForceLink';
import FilteredSample from './FilteredSample';
import EdgeLabelSample from './EdgeLabelSample';
import Dagre from '../src/Dagre'


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
  .addWithInfo('NodeShapes and EdgeShapes',
          'Render graph with dashed edges and diamond nodes.  Node and Edge shapes can be customized per node, using .type property, please see https://github.com/dunnock/react-sigma/blob/master/DOCS.md#edgeshapes for details.',
          () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="dashed"/>
      <NodeShapes default="diamond"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
      </LoadJSON>
    </Sigma>
  ))
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
  .addWithInfo('Force atlas 2',
          'Animate graph with randomized coordinates and relative node sizes running ForceAtlas2, see https://dunnock.github.io/react-sigma/upwork.json.  Click on graph node to see event data.',
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
  ))
  .addWithInfo('Force Link',
          'Animate graph with randomized coordinates and relative node sizes running ForceAtlas2, it is extended version of ForceAtlas2. Click on graph node to see event data.',
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
  ))
  .addWithInfo('Dagre',
          'Apply Dagre layout to the site tree, source: https://github.com/cpettitt/dagre/wiki#recommended-reading',
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
  })
  .add('Filter', () => ( <FilteredSample/>))
  .add('Edge Labels', () => ( <EdgeLabelSample />))

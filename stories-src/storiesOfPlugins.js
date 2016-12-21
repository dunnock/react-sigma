import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, RandomizeNodePositions, ForceLink } from '../src/index';
import FilteredSample from './FilteredSample';
import EdgeLabelSample from './EdgeLabelSample';


storiesOf('Plugins', module)
  .add('NOverlap', () => (
    <Sigma renderer="canvas">
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
  .add('Filter', () => ( <FilteredSample/>))
  .add('Edge Labels', () => ( <EdgeLabelSample />))
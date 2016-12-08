import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import {decorateAction} from '@kadira/storybook-addon-actions';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, SigmaEnableWebGL, RandomizeNodePositions } from '../src/index';

const sigmaAction = decorateAction([
  args => [{type: args[0].type,  data: {node: args[0].data.node, captor: args[0].data.captor} }]
]);


storiesOf('Complex graph samples', module)
  .add('Static', () => (
    <Sigma renderer="webgl" onClickNode={ sigmaAction('onClickNode') }>
      <LoadJSON path="/sites_coords.json"/>
    </Sigma>
  ))
  .add('Medium graph animated', () => (
    <Sigma renderer="canvas" onOverNode={ sigmaAction('onOverNode') }>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="star"/>
      <LoadGEXF path="/arctic.gexf">
        <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
        <RelativeSize initialSize={15}/>
      </LoadGEXF>
    </Sigma>
  ))
  .add('Big graph animated', () => (
    <Sigma settings={{drawEdges:false}} onClickNode={ sigmaAction('onClickNode') }>
      <LoadJSON path="/sites_nocoords.json">
        <RandomizeNodePositions>
          <ForceAtlas2 barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={3}/>
          <RelativeSize initialSize={8}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))


storiesOf('Loading', module)
  .add('LoadJSON without coords', () => (
    <Sigma>
      <LoadJSON path="/geolocalized.json">
        <RandomizeNodePositions/>
      </LoadJSON>
  	</Sigma>
  ))
  .add('LoadJSON with coords', () => (
    <Sigma>
      <LoadJSON path="/arctic.json"/>
    </Sigma>
  ))
  .add('LoadGEXF', () => (
    <Sigma>
      <LoadGEXF path="/arctic.gexf"/>
    </Sigma>
  ))


storiesOf('Components', module)
  .add('NOverlap', () => (
    <Sigma renderer="canvas">
      <LoadJSON path="/upwork.json">
        <NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))
  .add('NodeShapes and EdgeShapes', () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="diamond"/>
      <LoadJSON path="/upwork.json">
      </LoadJSON>
    </Sigma>
  ))
  .add('RelativeSize', () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="equilateral"/>
      <LoadJSON path="/geolocalized.json">
        <RandomizeNodePositions>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))
  .add('Force atlas 2', () => (
    <Sigma renderer="canvas">
      <EdgeShapes default="dotted"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RandomizeNodePositions>
          <ForceAtlas2 iterationsPerRender={1} timeout={6000}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))



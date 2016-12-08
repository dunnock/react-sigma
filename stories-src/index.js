import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import {decorateAction} from '@kadira/storybook-addon-actions';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, SigmaEnableWebGL, RandomizeNodePositions } from '../src/index';
import FilteredSample from './FilteredSample'

const sigmaAction = decorateAction([
  args => [{type: args[0].type,  data: {node: args[0].data.node, captor: args[0].data.captor} }]
]);


storiesOf('Complex graph samples', module)
  .addWithInfo('Static', 
              'Render big graph (12k nodes) with predefined size and coordinates, see https://dunnock.github.io/react-sigma/sites_coords.json. WebGL rendering. Click on graph node to see event data.', () => (
    <Sigma renderer="webgl" onClickNode={ sigmaAction('onClickNode') }>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/sites_coords.json"}/>
    </Sigma>
  ))
  .addWithInfo('Medium graph animated', 
              'Load medium size graph (~2k nodes) with coords and colors, then run RelativeSize and ForceAtlas2 algorythms. Canvas rendering. Roll over graph node to see event data.',
              () => (
    <Sigma renderer="canvas" onOverNode={ sigmaAction('onOverNode') }>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="star"/>
      <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
        <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
        <RelativeSize initialSize={15}/>
      </LoadGEXF>
    </Sigma>
  ))
  .addWithInfo('Big graph animated',
              'Load big graph (12k nodes, 30k edges), randomize coords and set relative node sizes, then run ForceAtlas2 algorythm with barnesHutOptimize option, see https://dunnock.github.io/react-sigma/sites_nocoords.json. WebGL rendering. Click on graph node to see event data.',
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


storiesOf('Settings', module)
  .add('No edges', () => (
    <Sigma renderer="canvas" settings={{drawEdges: false}}>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))
  .add('Labels', () => (
    <Sigma renderer="canvas" settings={{defaultLabelSize: 15, labelThreshold: 5, labelSize: "fixed", drawLabels: true}}>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RandomizeNodePositions>
          <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
          <RelativeSize initialSize={15}/>
        </RandomizeNodePositions>
      </LoadJSON>
    </Sigma>
  ))
  .add('Hovers', () => (
    <Sigma renderer="canvas" settings={{borderSize: 2, singleHover: true, defaultLabelHoverColor: "#F00", edgeHoverSizeRatio: 2, enableEdgeHovering: true}}>
      <EdgeShapes default="tapered"/>
      <NodeShapes default="star"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))
  .add('All settings', () => (
    <div>Refer to sigma documentation for full list of settings: https://github.com/jacomyal/sigma.js/wiki/Settings</div>
  ))


storiesOf('Loading', module)
  .add('LoadJSON without coords', () => (
    <Sigma>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/geolocalized.json"}>
        <RandomizeNodePositions/>
      </LoadJSON>
  	</Sigma>
  ))
  .add('LoadJSON with coords', () => (
    <Sigma>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/arctic.json"}/>
    </Sigma>
  ))
  .add('LoadGEXF', () => (
    <Sigma>
      <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}/>
    </Sigma>
  ))


storiesOf('Plugins', module)
  .add('NOverlap', () => (
    <Sigma renderer="canvas">
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))
  .add('NodeShapes and EdgeShapes', () => (
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
          'Animate graph with randomized coordinates and relative node sizes running ForceAtlas2, see https://dunnock.github.io/react-sigma/upwork.json. WebGL rendering. Click on graph node to see event data.',
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
  .add('Filter', () => ( <FilteredSample/>))


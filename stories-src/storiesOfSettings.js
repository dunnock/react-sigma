import React from 'react';
import { storiesOf } from '@storybook/react';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, ForceAtlas2, RelativeSize, RandomizeNodePositions } from '../src/index';
import { Note } from './style.js';

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
    <div style={Note}>Please refer to <a href="https://github.com/jacomyal/sigma.js/wiki/Settings">sigma settings documentation</a> for full list of settings.</div>
  ))

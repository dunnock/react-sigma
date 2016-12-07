import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2, RelativeSize, NOverlap, SigmaEnableWebGL } from '../src/index';


storiesOf('Various samples', module)
  .add('LoadJSON', () => (
    <Sigma renderer="canvas" key="2" settings={{drawEdge:true}} style={{maxWidth: "inherit", height: "500px"}}>
      <SigmaEnableWebGL />
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"} />
  	</Sigma>
  ))

  .add('LoadJSON with NOverlap', () => (
    <Sigma renderer="canvas" key="2" settings={{drawEdge:true}}>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))

  .add('LoadJSON with NodeShapes and EdgeShapes', () => (
    <Sigma renderer="canvas" key="2" settings={{drawEdge:true}}>
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="diamond"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
      </LoadJSON>
    </Sigma>
  ))

  .add('LoadJSON with RelativeSize', () => (
    <Sigma renderer="canvas" key="2" settings={{drawEdge:true}}>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))

  .add('All together', () => (
    <Sigma renderer="canvas" key="2" settings={{drawEdge:true}}>
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="diamond"/>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
        <NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
        <RelativeSize initialSize={15}/>
      </LoadJSON>
    </Sigma>
  ))

/*
storiesOf('Filter', module)
  .add('neighborsOf', () => (
    <Sigma renderer="canvas" key="1"
					onClickNode={ e => this.setState({filterNeighbours: e.data.node.id}) }
					onClickStage={ e => this.setState({filterNeighbours: null}) } >
			<EdgeShapes default="tapered"/>
			<NodeShapes default="star"/>
      <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
        <Filter neighborsOf={ this.state.filterNeighbours } />
      	<ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={3000}/>
        <RelativeSize initialSize={15}/>
      </LoadGEXF>
  	</Sigma>
  ))
*/
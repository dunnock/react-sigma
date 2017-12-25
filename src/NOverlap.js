// @flow

import React from 'react'
import '../sigma/plugins.animate'
import '../sigma/layout.noverlap'
import ReactSigmaLayoutPlugin from './ReactSigmaLayoutPlugin'

type State = {
	running: boolean
};
type Props = {
	nodes?: Array<Sigma$Node>,
	nodeMargin?: number,
	scaleNodes?: number,
	gridSize?: number,
	permittedExpansion?: number,
	speed?: number,
	maxIterations?: number,
	easing?: Sigma$Easing,
	duration?: number,
	sigma?: sigma
};

/**

NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

@param {number} [nodeMargin=5]    additional minimum space to apply around each and every node
@param {number} [scaleNodes=1.2]  multiplier,  larger nodes will have more space around
@param {number} [gridSize=20]   number of rows and columns to use when dividing the nodes up into cell
@param {number} [permittedExpansion=1.1]  maximum ratio to apply to the bounding box
@param {number} speed     larger value increases the speed at the cost of precision
@param {number} maxIterations  iterations to run the algorithm for before stopping it
@param {number} easing     camera easing type for camera transition
@param {number} duration     duration of the transition for the easing method

It accepts all the parameters of sigma.layout.noverlap plugin described on its github page:
[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.noverlap)

@example
<Sigma graph={data}>
 <NOverlap gridSize={10} maxIterations={100}/>
</Sigma>

**/


const NOverlap = (props: Props) => {
	const s = props.sigma
	if(s)
		return <ReactSigmaLayoutPlugin
			start={()=>s.startNoverlap()}
			config={options=>s.configNoverlap(options)}
			stop={()=>!!s && !!s.stopNoverlap && s.stopNoverlap()} {...props} />
	return null
}

export default NOverlap;

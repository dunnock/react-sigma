// @flow

import React from 'react'
import '../sigma/layout.dagre'
import ReactSigmaLayoutPlugin from './ReactSigmaLayoutPlugin'

type State = {
	running: boolean,
	timer?: number
};

type Props = {
	directed?: boolean,
	multigraph?: boolean,
	compound?: boolean,
	rankDir?: "TB" | "BT" | "RL" | "LR",
	easing?: Sigma$Easing,
	sigma?: Sigma
};


/**

Dagre layout algorythm.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of Dagre described on its github page:
@param {boolean}	directed?
@param {boolean}	multigraph?
@param {boolean}	compound?
@param {"TB"|"BT"|"RL"|"LR"}	rankDir?
@param {Sigma$Easing} easing  Easing mode

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.dagre)

**/


const Dagre = (props: Props) => (!!props.sigma
        ? <ReactSigmaLayoutPlugin
              start={()=>sigma.layouts.dagre.start(props.sigma)}
              config={(options)=>sigma.layouts.dagre.configure(props.sigma, options)}
              stop={() => console.warn("dagre stop not implemented")} {...props}/>
				: null)

export default Dagre;

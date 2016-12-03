// @flow

import Sigma from '../src/Sigma';
import EdgeShapes from '../src/EdgeShapes';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('Enable WebGL for sigma module imports without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma renderer="canvas" graph={test_graph}><EdgeShapes default="dotted"/></Sigma>, div);
});

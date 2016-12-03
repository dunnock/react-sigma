// @flow

import Sigma from '../src/Sigma';
import NodeShapes from '../src/NodeShapes';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('Enable WebGL for sigma module imports without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma renderer="canvas" graph={test_graph}><NodeShapes default="pacman"/></Sigma>, div);
});

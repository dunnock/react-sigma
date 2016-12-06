// @flow

import {Sigma, RandomizeNodePositions} from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma renderer="canvas" graph={test_graph}><RandomizeNodePositions/></Sigma>, div);
});

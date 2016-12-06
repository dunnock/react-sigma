// @flow

import {Sigma, NOverlap} from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('Sigma with NOverlap renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma renderer="canvas" graph={test_graph}><NOverlap/></Sigma>, div);
});

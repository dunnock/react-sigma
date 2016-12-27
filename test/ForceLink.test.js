// @flow

import {Sigma} from '../src/index';
import ForceLink from '../src/ForceLink';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('Sigma with ForceAtlas2 renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma renderer="canvas" graph={test_graph}><ForceLink timeout={10}/></Sigma>, div);
});

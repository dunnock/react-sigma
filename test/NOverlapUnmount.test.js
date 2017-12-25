// @flow

import {Sigma, ForceAtlas2, NOverlap} from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'


it('Sigma with NOverlap embedded ForceAtlas2 unmounts without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Sigma renderer="canvas" graph={test_graph}>
      <ForceAtlas2 timeout={10}>
        <NOverlap/>
      </ForceAtlas2>
    </Sigma>, div);
});


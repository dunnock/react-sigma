import {Sigma, SigmaEnableWebGL} from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';


it('Enable WebGL for sigma module imports without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SigmaEnableWebGL/>, div);
});

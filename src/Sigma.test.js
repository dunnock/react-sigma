import Sigma from './Sigma';
import React from 'react';
import ReactDOM from 'react-dom';


it('Sigma renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma />, div);
});

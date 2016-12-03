// @flow

import Sigma from '../src/Sigma';
import LoadJSON from '../src/LoadJSON';
import React from 'react';
import ReactDOM from 'react-dom';


it('loads graph from JSON file without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sigma><LoadJSON path="geolocalized.json"/></Sigma>, div);
});

// @flow

import sigma from '../sigma/main'
import {Sigma, LoadJSON} from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import TestSigma from './TestSigma'
import FakeXMLHttpRequest from "fake-xml-http-request";
import { test_graph } from './data';


it('loads graph from JSON file without crashing', () => {
	let xhr = new FakeXMLHttpRequest();
	sigma.utils.xhr = () => xhr;

  const div = document.createElement('div');
  ReactDOM.render(<Sigma>
  		<LoadJSON path={`geolocalized.json`}>   		
	  		<TestSigma testConstruct={s => expect(s.graph.nodes().length).toBe(2)}/>
  	</LoadJSON>
  </Sigma>, div);

  xhr.respond(200, {"Content-Type": "application/json"}, JSON.stringify(test_graph));
});

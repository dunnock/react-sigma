// @flow

import {Sigma} from '../src/index';
import TestSigma from './TestSigma'
import React from 'react';
import ReactDOM from 'react-dom';
import { test_graph } from './data'

describe('Sigma main', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Sigma />, div);
	});

	it('can preload graph', () => {
		const div = document.createElement('div');
	  const sigma_graph = <Sigma graph={test_graph}>
	  		<TestSigma testConstruct={s => expect(s.graph.nodes().length).toBe(2)} />
	  	</Sigma>
	  ReactDOM.render(sigma_graph, div);
	});
})
import React from 'react'
import sigma from '../sigma/main'


/**
 *
 * Test wrapper running test on sigma instance right from the sigma compoenent
 *
 * @param {testConstruct} (sigma)=>void
 * @param {testRender}    (sigma)=>void
**/

class TestSigma extends React.PureComponent {
	constructor(props) {
		super(props)
		if( this.props.testConstruct )
			this.props.testConstruct(this.props.sigma)
	}

	render() {
		if( this.props.testRender )
			this.props.testRender(this.props.sigma)
		return null
	}

}

export default TestSigma;


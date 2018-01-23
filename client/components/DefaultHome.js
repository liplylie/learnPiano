import React, { Component } from 'react'

class DefaultHome extends Component {
	constructor(props){
		super(props)
		this.state = {
			redirect: false
		}
	}

	render() {
		return (
			<div className="text-center" style={{minHeight: '100vh', maxHeight: '100vh', flex: 1, paddingTop: '4em', backgroundColor: 'lightgray',  overflow: 'scroll'}}>
				Home
			</div>
		)
	}
}

export default DefaultHome
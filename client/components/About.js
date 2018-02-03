import React, { Component } from 'react'

class About extends Component {
	constructor(){
		super()
	}

	render(){
		return (
     <div style={{height:"100vh", width:"100vw", textAlign: "center", overflowY: "scroll"}}>
				<div style={{width:"80vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1, overflowX: "scroll"}}>
					<div className="row" style={{height: "7em"}}></div>
					<div className="col-md-12"> 
						About 
					</div>
				</div>
			</div>
    )
	}
}

export default About
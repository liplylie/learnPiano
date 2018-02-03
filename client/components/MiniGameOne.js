import React, { Component } from 'react'

class MiniGameOne extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentDidMount(){
		let notes = "C4 D4 E4 F4 G4".split(" ")
		let randomNumber = Math.floor(Math.random() * 5)
		console.log(notes[randomNumber], 'randomNumber')
	}

	render(){
		return (
			<div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
        <div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1}}>
          <div className="row" style={{height: "8em"}}>
          </div>
          <div className="row">
            <div className="col-md-12"> 
              <div><span style={{fontFamily: "helvetica", fontSize: "5em"}}>Mini Game One</span></div>
            </div>
           </div>
          <div className="row">
          	<div className="col-md-4">
          		<img style={{height: "10vh", width: "5vw", marginTop: "20vh"}} src={require('../static/redX.png')}/>
          	</div>
          	<div className="col-md-4">
       			</div>
       			<div className="col-md-4">
       				<img style={{height: "10vh", width: "5vw", marginTop: "20vh"}} src={require('../static/greenCheck.png')}/>
       			</div>
          </div>
        </div>
      </div>

		)
	}
}

export default MiniGameOne
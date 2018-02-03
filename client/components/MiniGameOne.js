import React, { Component } from 'react'

import C4 from "../static/C4.gif"
import D4 from "../static/D4.jpeg"
import E4 from "../static/E4.png"
import F4 from "../static/F4.jpg"
import G4 from "../static/G4.png"

class MiniGameOne extends Component {
	constructor(props){
		super(props)
		this.state = {
			guessNote: "",
			notePicture: {
				C4: C4,
				D4: D4,
				E4: E4,
				F4: F4,
				G4: G4
			}
		}
		this.notePicture = ""
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount(){
		
	}

	handleClick(){
		let notes = "C4 D4 E4 F4 G4".split(" ")
		let randomNumber = Math.floor(Math.random() * 5)
		console.log(notes[randomNumber], 'randomNumber')
		this.setState({ guessNote:notes[randomNumber]} )
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
          	  <img id="guessNote" style={{height: "40vh", width: "12vw", marginTop: "8vh"}} src={this.state.notePicture[this.state.guessNote]}/>
       			</div>
       			<div className="col-md-4">
       				<img style={{height: "10vh", width: "5vw", marginTop: "20vh"}} src={require('../static/greenCheck.png')}/>
       			</div>
          </div>
          <button onClick={()=>this.handleClick()}> click me </button>
        </div>
      </div>

		)
	}
}

export default MiniGameOne
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class DefaultHome extends Component {
	constructor(props){
		super(props)
		this.state = {
			redirect: false
		}
	}

	render() {
		if (this.props.authenticated) {
			return <Redirect to='/Profile'/>
		}

		return (
			<div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img style={{height: "100vh", width: "100vw", position: "relative"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="First slide"></img>
            <div className="carousel-caption d-none d-md-block">
            </div>
            <h2 style={{position:"absolute", top: "5em", 
							width: "100%", textAlign: "center" }}> <span style={{color: "white",
							font: "bold 35px/45px Helvetica, Sans-Serif",
							textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
							letterSpacing: "-1px",  
							padding: ".4em"}}>Learn the Basics of Piano!<br/>Please Log In To Continue</span></h2>
          </div>
          <div className="carousel-item">
            <img style={{height: "100vh", width: "100vw"}} className="d-block img-fluid image-size" src={require('../static/pianoHall.jpg')} alt="Second slide"></img>
            <div className="carousel-caption d-none d-md-block">
            </div>
            <h2 style={{position:"absolute", top: "5em", 
							width: "100%", textAlign: "center" }}> <span style={{color: "white",
							font: "bold 40px/45px Helvetica, Sans-Serif",
							textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
							letterSpacing: "-1px",  
							padding: ".4em"}}>Learn the Basics of Piano!<br/>Please Log In To Continue</span></h2>
          </div>
          <div className="carousel-item">
            <img style={{height: "100vh", width: "100vw"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="Third slide"></img>
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item">
            <img style={{height: "100vh", width: "100vw"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="Fourth slide"></img>
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
			<div className="text-center" style={{minHeight: '100vh', maxHeight: '100vh', flex: 1, paddingTop: '4em', backgroundColor: 'lightgray',  overflow: 'scroll'}}>
	 				Write about website here
			</div>
      </div>
			
		)
	}
}

export default DefaultHome


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ImageZoom from 'react-medium-image-zoom'

class DefaultHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to='/profile'/>
    }

    return (
      <div>
        <div style={{height:"100vh", width:"100vw", textAlign: "center", overflowY: "scroll"}}>
          <div style={{width:"80vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1, overflowX: "scroll"}}>
            <div className="row" style={{height: "7em"}}></div>
            <div className="row">
              <div className="col-md-12 wow fadeIn animated"> 
                <img src={require("../static/learnpianofun.png")} alt="learnpianofun"/>
              </div>
            </div>
            <div className="row wow fadeIn animated" style={{padding: "1em"}}>
              <div className="col-md-4"> 
                <p style={{fontFamily: 'Helvetica', color: "skyblue", fontSize: "1.5em"}}> Learn the basics of piano. No installation or plugins needed!</p>
                 <ImageZoom
                    image={{
                      src: require("../static/profileSample.jpg"),
                      alt: 'gameSample',
                      className: 'col',
                      style: {height: "25em", width: "25em"}
                    }}
                    zoomImage={{
                      src: require("../static/profileSample.jpg"),
                      alt: 'gameSample'
                    }}
                  />
              </div>
              <div className="col-md-4"> 
                <p style={{fontFamily: 'Helvetica', color: "green", fontSize: "1.5em"}}> Play through exciting mini games to build sight reading skills</p>
                 <ImageZoom
                    image={{
                      src: require("../static/miniGameOneSample.jpg"),
                      alt: 'gameSample',
                      className: 'col',
                      style: {height: "25em", width: "25em"}
                    }}
                    zoomImage={{
                      src: require("../static/miniGameOneSample.jpg"),
                      alt: 'gameSample'
                    }}
                  />
              </div>
              <div className="col-md-4"> 
                <p style={{fontFamily: 'Helvetica', color: "gray", fontSize: "1.5em"}}> Blast through lessons to gain piano playing skills!</p>
                 <ImageZoom
                    image={{
                      src: require("../static/lessonSample.jpg"),
                      alt: 'gameSample',
                      className: 'col',
                      style: {height: "25em", width: "25em"}
                    }}
                    zoomImage={{
                      src: require("../static/lessonSample.jpg"),
                      alt: 'gameSample'
                    }}
                  />
              </div>
            </div>
            <div className="row" style={{padding: "1em"}}>
              <div className="col-md-12 wow fadeIn animated" style={{fontFamily: 'Helvetica', fontSize: "3em"}}>
              All you will need is a piano or piano app to get started!
              </div>
            </div>
          </div>
        </div>
        <div style={{height:"100vh", width:"100vw", textAlign: "center", overflowY: "scroll"}}>
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" >
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img style={{height: "100vh", width: "80vw", position: "relative", margin: "auto"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="First slide"></img>
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
                <img style={{height: "100vh", width: "80vw", margin: "auto"}} className="d-block img-fluid image-size" src={require('../static/pianoHall.jpg')} alt="Second slide"></img>
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
                <img style={{height: "100vh", width: "80vw", margin: "auto"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="Third slide"></img>
                <div className="carousel-caption d-none d-md-block">
                </div>
              </div>
              <div className="carousel-item">
                <img style={{height: "100vh", width: "80vw", margin: "auto"}} className="d-block img-fluid image-size" src={require('../static/pianoBeginner.jpg')} alt="Fourth slide"></img>
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
        </div>
      </div>
    )
  }
}
export default DefaultHome
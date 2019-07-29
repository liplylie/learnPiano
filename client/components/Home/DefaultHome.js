import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ImageZoom from "react-medium-image-zoom";

// Local
import Piano from "../Piano.js";
import PianoBackground from "../../static/PianoBackground.jpg"

class DefaultHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  showPiano() {
    document.getElementById("showPiano").style.display = "block";
    document.getElementById("showPianoButton").style.display = "none";
  }

  hidePiano() {
    document.getElementById("showPiano").style.display = "none";
    document.getElementById("showPianoButton").style.display = "block";
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/profile" />;
    }

    return (
      <div>
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            margin: "auto",
            backgroundColor: "white",
            overflowY: "scroll",
            overflowX: "hidden",
            textAlign: "center"
          }}
        >
          <div 
            className="ImageScrollContainer section-1"
            style={{backgroundImage: `url(${PianoBackground})`}}
          >
            <img
              src={require("../../static/learnpianofun.png")}
              alt="learnpianofun"
            />
            <p id="useWebsiteVersion"> Please Use The Website Version of this Site</p>
            <div className="gradient_bot scrollDown ">
              <i className="downArrow" />
              <div className="gps_ring" />
            </div>
          </div>
          <div
            className="row firstSection"
            style={{ height: "60vh"}}
          >
            <div
              className="col-md-4 wow bounceInLeft"
              style={{ paddingTop: "4vh" }}
            >
              <h1
                style={{
                  fontFamily: "Helvetica",
                  fontWeight: "300",
                  color: "white",
                  fontSize: "3em",
                  letterSpacing: "2px"
                }}
              >
                {" "}
                Learn the basics of piano. No installation or plugins needed!
              </h1>
            </div>
            <div className="col-md-4" />
            <div
              className="col-md-4 wow bounceInRight"
              style={{ paddingTop: "15vh", paddingRight: "3vw" }}
            >
              <div id="sampleVideo1" className="effect1 embed-responsive embed-responsive-21by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/NgQL1Dg5-H8"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ height: "60vh"}}
          >
            <div
              className="col-md-4 wow bounceInLeft"
              style={{ paddingTop: "15vh", paddingLeft: "3vw" }}
            >
              <div id="sampleVideo2" className="effect1 embed-responsive embed-responsive-21by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/24J4nqoSEH4"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="col-md-4" />
            <div
              className="col-md-4 wow bounceInRight"
              style={{ paddingTop: "3vh", paddingRight: "3vw" }}
            >
              <h1
                style={{
                  fontFamily: "Helvetica",
                  fontWeight: "300",
                  color: "black",
                  fontSize: "3em",
                  letterSpacing: "2px"
                }}
              >
                {" "}
                Play through exciting mini games to build sight reading skills
              </h1>
            </div>
          </div>
          <div
            className="row firstSection"
            style={{ height: "60vh"}}
          >
            <div
              className="col-md-4 wow bounceInLeft"
              style={{ paddingTop: "3vh", paddingLeft: "3vw" }}
            >
              <h1
                style={{
                  fontFamily: "Helvetica",
                  fontWeight: "300",
                  color: "white",
                  fontSize: "3em",
                  letterSpacing: "2px"
                }}
              >
                {" "}
                Blast through lessons to gain piano playing skills!
              </h1>
            </div>

            <div className="col-md-4" />
            <div
              className="col-md-4 wow bounceInRight"
              style={{ paddingTop: "3vh", paddingLeft: "3vw" }}
            >
              <ImageZoom
                image={{
                  src: require("../../static/lessonSample.jpg"),
                  alt: "gameSample",
                  className: "col",
                  style: { height: "25em", width: "25em" },
                  id:"sampleImage"
                }}
                zoomImage={{
                  src: require("../../static/lessonSample.jpg"),
                  alt: "gameSample"
                }}
              />
            </div>
          </div>

          <div className="row wow fadeIn animated" style={{ padding: "1em" }}>
            <div
              className="col-md-12 wow fadeIn animated"
              style={{ fontFamily: "Helvetica", fontSize: "3em" }}
            >
              You can play with any piano, or with this one here!
              <div
                id="showPianoButton"
                style={{ cursor: "pointer" }}
                onClick={() => this.showPiano()}
              >
                <img
                  className=""
                  style={{
                    height: "4em",
                    width: "4em",
                    margin: ".5em"
                  }}
                  src={require("../../static/pianoKeys.png")}
                />
                <p className=""> Open Piano</p>
              </div>
              <div id="showPiano" style={{ display: "none" }}>
                <Piano />
                <p
                  onClick={() => this.hidePiano()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  hide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DefaultHome;

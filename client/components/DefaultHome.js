import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ImageZoom from "react-medium-image-zoom";
import Piano from "./Piano.js";


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
            height: "100vh",
            width: "100vw",
            textAlign: "center",
            overflowY: "scroll"
          }}
        >
          <div
            style={{
              width: "80vw",
              minHeight: "100vh",
              margin: "auto",
              backgroundColor: "white",
              flex: 1,
              overflowX: "scroll"
            }}
            className="effect8"
          >
            <div className="row" style={{ height: "7em" }} />
            <div className="row">
              <div className="col-md-12 wow fadeIn animated">
                <img
                  src={require("../static/learnpianofun.png")}
                  alt="learnpianofun"
                />
              </div>
            </div>
            <div className="row wow fadeIn animated" style={{ padding: "1em" }}>
              <div className="col-md-4">
                <p
                  style={{
                    fontFamily: "Helvetica",
                    color: "skyblue",
                    fontSize: "1.5em"
                  }}
                >
                  {" "}
                  Learn the basics of piano. No installation or plugins needed!
                </p>
                <div className="embed-responsive embed-responsive-4by3">
                <iframe className ="embed-responsive-item" src="https://www.youtube.com/embed/NgQL1Dg5-H8" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-md-4">
                <p
                  style={{
                    fontFamily: "Helvetica",
                    color: "green",
                    fontSize: "1.5em"
                  }}
                >
                  {" "}
                  Play through exciting mini games to build sight reading skills
                </p>
                <div className="embed-responsive embed-responsive-4by3">
                <iframe className ="embed-responsive-item" src="https://www.youtube.com/embed/24J4nqoSEH4" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-md-4">
                <p
                  style={{
                    fontFamily: "Helvetica",
                    color: "gray",
                    fontSize: "1.5em"
                  }}
                >
                  {" "}
                  Blast through lessons to gain piano playing skills!
                </p>
                <ImageZoom
                  image={{
                    src: require("../static/lessonSample.jpg"),
                    alt: "gameSample",
                    className: "col",
                    style: { height: "25em", width: "25em" }
                  }}
                  zoomImage={{
                    src: require("../static/lessonSample.jpg"),
                    alt: "gameSample"
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ padding: "1em" }}>
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
                            src={require("../static/pianoKeys.png")}
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
      </div>
    );
  }
}
export default DefaultHome;

/*

 <div
          style={{
            height: "100vh",
            width: "100vw",
            textAlign: "center",
            overflowY: "scroll"
          }}
        >
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
              <li data-target="#carouselExampleIndicators" data-slide-to="3" />
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img
                  style={{
                    height: "100vh",
                    width: "80vw",
                    position: "relative",
                    margin: "auto"
                  }}
                  className="d-block img-fluid image-size"
                  src={require("../static/pianoBeginner.jpg")}
                  alt="First slide"
                />
                <div className="carousel-caption d-none d-md-block" />
                <h2
                  style={{
                    position: "absolute",
                    top: "5em",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  <span
                    style={{
                      color: "white",
                      font: "bold 35px/45px Helvetica, Sans-Serif",
                      textShadow:
                        "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                      letterSpacing: "-1px",
                      padding: ".4em"
                    }}
                  >
                    Learn the Basics of Piano!<br />Please Log In To Continue
                  </span>
                </h2>
              </div>
              <div className="carousel-item">
                <img
                  style={{ height: "100vh", width: "80vw", margin: "auto" }}
                  className="d-block img-fluid image-size"
                  src={require("../static/pianoHall.jpg")}
                  alt="Second slide"
                />
                <div className="carousel-caption d-none d-md-block" />
                <h2
                  style={{
                    position: "absolute",
                    top: "5em",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  <span
                    style={{
                      color: "white",
                      font: "bold 40px/45px Helvetica, Sans-Serif",
                      textShadow:
                        "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                      letterSpacing: "-1px",
                      padding: ".4em"
                    }}
                  >
                    Learn the Basics of Piano!<br />Please Log In To Continue
                  </span>
                </h2>
              </div>
              <div className="carousel-item">
                <img
                  style={{ height: "100vh", width: "80vw", margin: "auto" }}
                  className="d-block img-fluid image-size"
                  src={require("../static/pianoBeginner.jpg")}
                  alt="Third slide"
                />
                <div className="carousel-caption d-none d-md-block" />
              </div>
              <div className="carousel-item">
                <img
                  style={{ height: "100vh", width: "80vw", margin: "auto" }}
                  className="d-block img-fluid image-size"
                  src={require("../static/pianoBeginner.jpg")}
                  alt="Fourth slide"
                />
                <div className="carousel-caption d-none d-md-block" />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

*/

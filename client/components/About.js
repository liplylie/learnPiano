import React, { Component } from "react";
import Piano from "./Piano.js";

class About extends Component {
	constructor() {
		super();
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
		return (
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
					className="effect8 wow fadeIn"
				>
					<div className="row" style={{ height: "7em" }} />
					<div className="row">
					<div className="col-md-12 text-center" style={{fontSize: "2em"}}>
						<h1>Learn Piano Fun</h1>
						<p>Learn Piano Fun is a website for interactively learning how to play the <a href="https://en.wikipedia.org/wiki/Piano" target="_blank">piano</a></p>
						<p>There is no need for <a href="https://en.wikipedia.org/wiki/MIDI_controller" target="_blank">MIDI controllers</a> or other devices that connect to the computer</p>
						<p>All that you need is a piano or piano app to play the piano. Make sure that the volume of the piano can reach the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank">microphone</a> of your computer or laptop</p>
						<p>Even if you do not own a piano, that's ok! With the built in piano, you can still play through the app. (Piano is built by <a href="https://github.com/michaelmp/js-piano">michaelmp</a>) See it here:</p>
						<div
                        id="showPianoButton"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.showPiano()}
                    >
                        <img
                            className="wow rollIn"
                            style={{
                                height: "4em",
                                width: "4em",
                                margin: ".5em"
                            }}
                            src={require("../static/pianoKeys.png")}
                        />
                        <p className="wow flipInX center"> Open Piano</p>
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
						<iframe width="560" height="315" src="https://www.youtube.com/embed/NgQL1Dg5-H8" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;

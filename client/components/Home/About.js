import React, { useState, memo } from "react";

// Global
import { PageContainer } from "~/theme";

// Local
import Piano from "../Piano.js";

const About = memo(() => {
  const [showPiano, changeShowPiano] = useState(false);
  return (
    <PageContainer className="effect8">
      <div className="row" className="wow">
        <div className="col-md-12 text-center" style={{ fontSize: "2em" }}>
          <h1>Learn Piano Fun</h1>

          <p>
            Learn Piano Fun is a website for interactively learning how to play
            the{" "}
            <a href="https://en.wikipedia.org/wiki/Piano" target="_blank">
              piano
            </a>
          </p>

          <p>
            There is no need for{" "}
            <a
              href="https://en.wikipedia.org/wiki/MIDI_controller"
              target="_blank"
            >
              MIDI controllers
            </a>{" "}
            or other devices that connect to the computer
          </p>

          <p>
            All that you need is a piano or piano app to play the piano. Make
            sure that the volume of the piano can reach the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
              target="_blank"
            >
              microphone
            </a>{" "}
            of your computer or laptop
          </p>

          <p>
            Even if you do not own a piano, that's ok! With the built in piano,
            you can still play through the app. (Piano is built by{" "}
            <a href="https://github.com/michaelmp/js-piano">michaelmp</a>) See
            it here:
          </p>

          <div
            id="showPianoButton"
            style={
              !showPiano
                ? { display: "block", cursor: "pointer" }
                : { display: "none" }
            }
            onClick={() => changeShowPiano(true)}
          >
            <img
              className="wow rollIn"
              style={{
                height: "4em",
                width: "4em",
                margin: ".5em"
              }}
              src={require("~/static/pianoKeys.png")}
            />
            <p className="wow flipInX center"> Open Piano</p>
          </div>

          <div style={showPiano ? { display: "block" } : { display: "none" }}>
            <Piano closePiano={!showPiano} />

            <p
              onClick={() => changeShowPiano(false)}
              style={{ cursor: "pointer" }}
            >
              hide
            </p>
          </div>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/NgQL1Dg5-H8"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />

          <div className="text-center" style={{ margin: "1em" }}>
            Creator: Jordan Daniels
            <br />
            <img
              style={{ height: "10em", width: "10em" }}
              alt=""
              src="https://s3.us-east-2.amazonaws.com/www.learnpianofun.com/pictures/oFwEEb9GdseMJRwnQfNw3phOt4v2/profilePic.png"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
});

export default About;

import React, { Component } from "react";

import A2Sound from "../samples/A2.ogg";
import A3Sound from "../samples/A3.ogg";
import A4Sound from "../samples/A4.ogg";
import A5Sound from "../samples/A5.ogg";
import Ab3Sound from "../samples/Ab3.ogg";
import Ab4Sound from "../samples/Ab4.ogg";
import B2Sound from "../samples/B2.ogg";
import B3Sound from "../samples/B3.ogg";
import B4Sound from "../samples/B4.ogg";
import B5Sound from "../samples/B5.ogg";
import Bb2Sound from "../samples/Bb2.ogg";
import Bb3Sound from "../samples/Bb3.ogg";
import Bb4Sound from "../samples/Bb4.ogg";
import C3Sound from "../samples/C3.ogg";
import C4Sound from "../samples/C4.ogg";
import C5Sound from "../samples/C5.ogg";
import D3Sound from "../samples/D3.ogg";
import D4Sound from "../samples/D4.ogg";
import Db3Sound from "../samples/Db3.ogg";
import Db4Sound from "../samples/Db4.ogg";
import E3Sound from "../samples/E3.ogg";
import E4Sound from "../samples/E4.ogg";
import Eb3Sound from "../samples/Eb3.ogg";
import Eb4Sound from "../samples/Eb4.ogg";
import F3Sound from "../samples/F3.ogg";
import F4Sound from "../samples/F4.ogg";
import G3Sound from "../samples/G3.ogg";
import G4Sound from "../samples/G4.ogg";
import Gb3Sound from "../samples/Gb3.ogg";
import Gb4Sound from "../samples/Gb4.ogg";

const keys = [
  "A2",
  "Bb2",
  "B2",
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5"
];

    const codes = [
      90,
      83,
      88,
      67,
      70,
      86,
      71,
      66,
      78,
      74,
      77,
      75,
      81,
      50,
      87,
      69,
      52,
      82,
      53,
      84,
      89,
      55,
      85,
      56,
      73,
      57,
      79,
      80
    ];

/**
  Copyright 2012 Michael Morris-Pearce

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.

  Jordan Daniels - I changed a few lines because they were causing bugs
*/

class Piano extends Component {
  /* Piano keyboard pitches. Names match sound files by ID attribute. */
  componentWillUpdate(nextProps) {
    if (nextProps.closePiano !== this.props.closePiano) {
      if (!nextProps.closePiano) {
        this.generateSound();
      } else {
        this.removeEventListeners();
      }
    }
  }

  componentDidMount() {
    const { closePiano } = this.props;
    if (!closePiano) {
      this.generateSound();
    }
  }

  removeEventListeners = () => {
    const pianoClass = name => {
      return ".piano-" + name;
    };
    function sound(id) {
      var it = document.getElementById(soundId(id));
      return it;
    }
    function soundId(id) {
      return "sound-" + id;
    }
    keys.forEach(key => {
      let audio = sound(key);
      $(pianoClass(key)).off();
      $(pianoClass(key)).unbind();
      if (audio) {
        audio.volume = 0;
        audio.muted = true;
      }
    });
  };

  generateSound = () => {
    let that = this;

    /* Corresponding keyboard keycodes, in order w/ 'keys'. */
    /* QWERTY layout:
    /*   upper register: Q -> P, with 1-0 as black keys. */
    /*   lower register: Z -> M, , with A-L as black keys. */

    const pedal = 32; /* Keycode for sustain pedal. */
    const tonic = "A2"; /* Lowest pitch. */

    /* Piano state. */

    const intervals = {};
    const depressed = {};
    /* Selectors */

    function pianoClass(name) {
      return ".piano-" + name;
    }

    function soundId(id) {
      return "sound-" + id;
    }

    function sound(id) {
      var it = document.getElementById(soundId(id));
      return it;
    }

    /* Virtual piano keyboard events. */

    function keyup(code) {
      var offset = codes.indexOf(code);
      var k;
      if (offset >= 0) {
        k = keys.indexOf(tonic) + offset;
        return keys[k];
      }
    }

    function keydown(code) {
      return keyup(code);
    }

    function press(key) {

      var audio = sound(key);
      if (depressed[key]) {
        return;
      }
      clearInterval(intervals[key]);
      if (audio) {
        if (!that.props.closePiano) {
          audio.muted = false;
        }
        audio.pause();
        audio.volume = 1.0;
        if (audio.readyState >= 2) {
          audio.currentTime = 0;
          audio.addEventListener("loadeddata", function() {
            audio.play();
          });
          audio.load();
          //audio.play();
          depressed[key] = true;
        }
      }
      $(pianoClass(key)).animate(
        {
          backgroundColor: "#88FFAA"
        },
        0
      );
    }

    /* Manually diminish the volume when the key is not sustained. */
    /* These values are hand-selected for a pleasant fade-out quality. */

    function fade(key) {
      var audio = sound(key);
      var stepfade = function() {
        if (audio) {
          if (audio.volume < 0.03) {
            kill(key)();
          } else {
            if (audio.volume > 0.2) {
              audio.volume = audio.volume * 0.95;
            } else {
              audio.volume = audio.volume - 0.01;
            }
          }
        }
      };
      return function() {
        clearInterval(intervals[key]);
        intervals[key] = setInterval(stepfade, 5);
      };
    }

    /* Bring a key to an immediate halt. */

    function kill(key) {
      var audio = sound(key);
      return function() {
        clearInterval(intervals[key]);
        if (audio) {
          audio.pause();
        }
        if (key.length > 2) {
          $(pianoClass(key)).animate(
            {
              backgroundColor: "black"
            },
            300,
            "easeOutExpo"
          );
        } else {
          $(pianoClass(key)).animate(
            {
              backgroundColor: "white"
            },
            300,
            "easeOutExpo"
          );
        }
      };
    }

    /* Simulate a gentle release, as opposed to hard stop. */

    var fadeout = true;

    /* Sustain pedal, toggled by user. */

    var sustaining = false;

    /* Register mouse event callbacks. */

    keys.forEach(function(key) {
      $(pianoClass(key)).mousedown(function() {
        $(pianoClass(key)).animate(
          {
            backgroundColor: "#88FFAA"
          },
          0
        );
        press(key);
      });
      if (fadeout) {
        $(pianoClass(key)).mouseup(function() {
          depressed[key] = false;
          if (!sustaining) {
            fade(key)();
          }
        });
      } else {
        $(pianoClass(key)).mouseup(function() {
          depressed[key] = false;
          if (!sustaining) {
            kill(key)();
          }
        });
      }
    });

    /* Register keyboard event callbacks. */

    $(document).keydown(function(event) {
      event.stopImmediatePropagation();
      if (event.which === pedal) {
        sustaining = true;
        $(pianoClass("pedal")).addClass("piano-sustain");
      }
      press(keydown(event.which));
    });

    $(document).keyup(function(event) {
      event.stopImmediatePropagation();
      if (event.which === pedal) {
        sustaining = false;
        $(pianoClass("pedal")).removeClass("piano-sustain");
        Object.keys(depressed).forEach(function(key) {
          if (!depressed[key]) {
            if (fadeout) {
              fade(key)();
            } else {
              kill(key)();
            }
          }
        });
      }
      if (keyup(event.which)) {
        depressed[keyup(event.which)] = false;
        if (!sustaining) {
          if (fadeout) {
            fade(keyup(event.which))();
          } else {
            kill(keyup(event.which))();
          }
        }
      }
    });
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>28-key Piano</title>
        <audio id="sound-A2" src={A2Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Bb2" src={Bb2Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-B2" src={B2Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Ab3" src={Ab3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-A3" src={A3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Bb3" src={Bb3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-B3" src={B3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-C3" src={C3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Db3" src={Db3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-D3" src={D3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Eb3" src={Eb3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-E3" src={E3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-F3" src={F3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Gb3" src={Gb3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-G3" src={G3Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Ab4" src={Ab4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-A4" src={A4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Bb4" src={Bb4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-B4" src={B4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-C4" src={C4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Db4" src={Db4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-D4" src={D4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Eb4" src={Eb4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-E4" src={E4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-F4" src={F4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-Gb4" src={Gb4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-G4" src={G4Sound} preload="auto" type="audio/ogg" />
        <audio id="sound-C5" src={C5Sound} preload="auto" type="audio/ogg" />
        <div className="piano">
          <div className="piano-container">
            <div className="piano-keys">
              <div className="piano-white piano-A2" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Bb2" />
              </div>
              <div className="piano-white piano-B2" />
              <div className="piano-white piano-C3" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Db3" />
              </div>
              <div className="piano-white piano-D3" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Eb3" />
              </div>
              <div className="piano-white piano-E3" />
              <div className="piano-white piano-F3" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Gb3" />
              </div>
              <div className="piano-white piano-G3" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Ab3" />
              </div>
              <div className="piano-white piano-A3" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Bb3" />
              </div>
              <div className="piano-white piano-B3" />
              <div className="piano-white piano-C4" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Db4" />
              </div>
              <div className="piano-white piano-D4" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Eb4" />
              </div>
              <div className="piano-white piano-E4" />
              <div className="piano-white piano-F4" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Gb4" />
              </div>
              <div className="piano-white piano-G4" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Ab4" />
              </div>
              <div className="piano-white piano-A4" />
              <div className="piano-black">
                <div className="piano-black-raised piano-Bb4" />
              </div>
              <div className="piano-white piano-B4" />
              <div className="piano-white piano-C5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Piano;

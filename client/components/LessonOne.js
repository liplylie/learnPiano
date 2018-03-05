import React, { Component } from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { app, firebaseDB } from "../firebase";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "../actions/authActions.js";
import * as LessonsCompleted from "../actions/lessonsCompletedActions";
import Popup from "react-popup";
import pitchTable from "../helpers/pitchTable";
import pitchTablePictures from "../helpers/pitchTablePictures";
import Piano from "./Piano.js";

class LessonOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctNote: null,
            wrongNote: null,
            checkNote: null,
            buttonToShow: null,
            lessonCompleted: false
        };
        this.popUpCount = 1;
        this.correctAnswers = 1;
        this.noteArray = [];
        this.findPitch = this.findPitch.bind(this);
        this.lessonOneButtonTwo = this.lessonOneButtonTwo.bind(this);
        this.lessonOneButtonFour = this.lessonOneButtonFour.bind(this);
        this.lessonOneButtonSeven = this.lessonOneButtonSeven.bind(this);
    }

    componentDidUpdate() {
        if (
            this.state.correctNote === this.state.checkNote &&
            this.popUpCount === this.correctAnswers &&
            !this.state.lessonCompleted
        ) {
            Popup.alert(
                <div style={{ fontFamily: "helvetica", fontSize: "2.5em" }}>
                    <img
                        style={{ height: "8em", width: "5em" }}
                        src={pitchTablePictures[this.state.checkNote]}
                    />{" "}
                    Correct! You played a {this.state.checkNote[0]}{" "}
                </div>
            );
            document.getElementById(
                `lessonOneButton${this.state.buttonToShow}`
            ).style.display =
                "block";
            this.popUpCount += 1;
            this.correctAnswers += 1;
            this.turnOffMicrophone();
        } else if (
            this.state.wrongNote &&
            this.noteArray.length &&
            this.popUpCount === this.correctAnswers &&
            !this.state.lessonCompleted
        ) {
            Popup.alert(
                <div style={{ fontFamily: "helvetica", fontSize: "2.5em" }}>
                    <img
                        style={{ height: "8em", width: "5em" }}
                        src={pitchTablePictures[this.state.wrongNote]}
                    />{" "}
                    Incorrect! You played a{" "}
                    {this.state.wrongNote.length === 3
                        ? this.state.wrongNote[0] + this.state.wrongNote[1]
                        : this.state.wrongNote[0]}
                </div>
            );
        }
    }

    componentWillUnmount() {
        if (this.audio) {
            this.audio.close();
        }
    }

    findPitch(matchNote) {
        let that = this;
        var baseFreq = 440;
        var currentNoteIndex = 57; // A4
        var isRefSoundPlaying = false;
        var isMicrophoneInUse = false;
        var frameId,
            freqTable,
            gauge,
            audioContext,
            micStream,
            notesArray,
            sourceAudioNode,
            analyserAudioNode,
            gainNode;

        var isAudioContextSupported = function() {
            window.AudioContext =
                window.AudioContext || window.webkitAudioContext;
            if (window.AudioContext) {
                return true;
            } else {
                return false;
            }
        };

        var reportError = function(message) {};

        var init = function() {
            freqTable = pitchTable;

            if (isAudioContextSupported()) {
                audioContext = new window.AudioContext();
                that.audio = audioContext;
            } else {
                reportError("AudioContext is not supported in this browser");
            }
        };

        var updatePitch = function(pitch) {};

        var updateNote = function(note) {
            if (
                note !== "--" &&
                note.indexOf("7") === -1 &&
                note.indexOf("8") === -1
            ) {
                console.log(note, "note");
                that.noteArray.push(note);
                if (
                    (note.includes("3") && that.noteArray.length === 1) ||
                    (note === "D4" && that.noteArray.length === 1)
                ) {
                    that.noteArray.push(note);
                    that.noteArray.push(note);
                }
                if (that.noteArray.length === 3) {
                    if (that.noteArray.includes(matchNote)) {
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        that.setState({
                            correctNote: matchNote
                        });
                    } else {
                        that.setState({
                            wrongNote: that.noteArray[2]
                        });
                        console.log(that.noteArray, "note array");
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        if (
                            document.getElementsByClassName(
                                "mm-popup__btn mm-popup__btn--ok"
                            )
                        ) {
                            let okButton = document.getElementsByClassName(
                                "mm-popup__btn mm-popup__btn--ok"
                            )[0];
                            console.log(okButton, "okbutton");
                            setTimeout(() => {
                                okButton.click();
                            }, 1000);
                        }
                        //that.toggleMicrophone()
                        setTimeout(() => {
                            that.toggleMicrophone();
                        }, 700);
                    }
                }
            }
        };

        var updateCents = function(cents) {};

        var isGetUserMediaSupported = function() {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            if (
                (navigator.mediaDevices &&
                    navigator.mediaDevices.getUserMedia) ||
                navigator.getUserMedia
            ) {
                return true;
            }
            return false;
        };

        var findFundamentalFreq = function(buffer, sampleRate) {
            var n = 1024;
            var bestK = -1;
            var bestR = 0;
            for (var k = 8; k <= 1000; k++) {
                var sum = 0;
                for (var i = 0; i < n; i++) {
                    sum +=
                        (buffer[i] - 128) / 128 * ((buffer[i + k] - 128) / 128);
                }
                var r = sum / (n + k);
                if (r > bestR) {
                    bestR = r;
                    bestK = k;
                }
                if (r > 0.9) {
                    break;
                }
            }
            if (bestR > 0.0025) {
                var fundamentalFreq = sampleRate / bestK;
                return fundamentalFreq;
            } else {
                return -1;
            }
        };

        var findClosestNote = function(freq, notes) {
            var low = -1;
            var high = notes.length;
            while (high - low > 1) {
                var pivot = Math.round((low + high) / 2);
                if (notes[pivot].frequency <= freq) {
                    low = pivot;
                } else {
                    high = pivot;
                }
            }
            if (
                Math.abs(notes[high].frequency - freq) <=
                Math.abs(notes[low].frequency - freq)
            ) {
                return notes[high];
            }
            return notes[low];
        };

        var findCentsOffPitch = function(freq, refFreq) {
            var log2 = 0.6931471805599453; // Math.log(2)
            var multiplicativeFactor = freq / refFreq;
            var cents = Math.floor(
                1200 * (Math.log(multiplicativeFactor) / log2)
            );
            return cents;
        };

        var detectPitch = function() {
            var buffer = new Uint8Array(analyserAudioNode.fftSize);
            analyserAudioNode.getByteTimeDomainData(buffer);
            var fundalmentalFreq = findFundamentalFreq(
                buffer,
                audioContext.sampleRate
            );
            if (fundalmentalFreq !== -1) {
                var note = findClosestNote(fundalmentalFreq, notesArray);
                var cents = findCentsOffPitch(fundalmentalFreq, note.frequency);
                updateNote(note.note);
                updateCents(cents);
            } else {
                updateNote("--");
                updateCents(-50);
            }
            frameId = window.requestAnimationFrame(detectPitch);
        };

        var streamReceived = function(stream) {
            micStream = stream;
            analyserAudioNode = audioContext.createAnalyser();
            console.log(audioContext, "audioContext");
            analyserAudioNode.fftSize = 2048;
            sourceAudioNode = audioContext.createMediaStreamSource(micStream);
            // let gainNode = audioContext.createGain()
            // analyserAudioNode.connect(gainNode)
            sourceAudioNode.connect(analyserAudioNode);
            detectPitch();
        };

        var turnOffReferenceSound = function() {
            sourceAudioNode.stop();
            sourceAudioNode = null;
            updatePitch("--");
            updateNote("--");
            isRefSoundPlaying = false;
        };

        this.turnOffMicrophone = function() {
            if (
                sourceAudioNode &&
                sourceAudioNode.mediaStream &&
                sourceAudioNode.mediaStream.stop
            ) {
                sourceAudioNode.mediaStream.stop();
            }
            sourceAudioNode = null;
            updatePitch("--");
            updateNote("--");
            updateCents(-50);
            analyserAudioNode = null;
            window.cancelAnimationFrame(frameId);
            isMicrophoneInUse = false;
        };

        this.toggleMicrophone = function() {
            if (isRefSoundPlaying) {
                turnOffReferenceSound();
            }

            if (!isMicrophoneInUse) {
                if (isGetUserMediaSupported()) {
                    notesArray = freqTable[baseFreq.toString()];
                    var getUserMedia =
                        navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia
                            ? navigator.mediaDevices.getUserMedia.bind(
                                  navigator.mediaDevices
                              )
                            : function(constraints) {
                                  return new Promise(function(resolve, reject) {
                                      navigator.getUserMedia(
                                          constraints,
                                          resolve,
                                          reject
                                      );
                                  });
                              };
                    getUserMedia({ audio: true })
                        .then(streamReceived)
                        .catch(reportError);
                    updatePitch(baseFreq);
                    isMicrophoneInUse = true;
                } else {
                    reportError(
                        "It looks like this browser does not support getUserMedia. " +
                            'Check <a href="http://caniuse.com/#feat=stream">http://caniuse.com/#feat=stream</a> for more info.'
                    );
                }
            } else {
                this.turnOffMicrophone();
            }
        };

        var toggleReferenceSound = function() {
            if (isMicrophoneInUse) {
                this.toggleMicrophone();
            }
            if (!isRefSoundPlaying) {
                notesArray = freqTable[baseFreq];
                sourceAudioNode = audioContext.createOscillator();
                sourceAudioNode.frequency.value =
                    notesArray[currentNoteIndex].frequency;
                sourceAudioNode.connect(audioContext.destination);
                sourceAudioNode.start();
                updatePitch(notesArray[currentNoteIndex].frequency);
                updateNote(notesArray[currentNoteIndex].note);
                isRefSoundPlaying = true;
            } else {
                turnOffReferenceSound();
            }
        };

        var changeBaseFreq = function(delta) {
            var newBaseFreq = baseFreq + delta;
            if (newBaseFreq >= 432 && newBaseFreq <= 446) {
                baseFreq = newBaseFreq;
                notesArray = freqTable[baseFreq.toString()];
                updatePitch(baseFreq);

                if (isRefSoundPlaying) {
                    var newNoteFreq = notesArray[currentNoteIndex].frequency;
                    sourceAudioNode.frequency.value = newNoteFreq;
                }
            }
        };

        var changeReferenceSoundNote = function(delta) {
            if (isRefSoundPlaying) {
                var newNoteIndex = currentNoteIndex + delta;
                if (newNoteIndex >= 0 && newNoteIndex < notesArray.length) {
                    currentNoteIndex = newNoteIndex;
                    var newNoteFreq = notesArray[currentNoteIndex].frequency;
                    sourceAudioNode.frequency.value = newNoteFreq;
                    updateNote(notesArray[currentNoteIndex].note);
                }
            }
        };

        var baseFreqChangeHandler = function(event) {
            changeBaseFreq(event.data);
        };

        var referenceSoundNoteHandler = function(event) {
            changeReferenceSoundNote(event.data);
        };

        init();
        this.toggleMicrophone();
    }

    lessonOneButtonOne() {
        document.getElementById("lessonOneMessageOne").style.display = "none";
        document.getElementById("lessonOneButtonOne").style.display = "none";
        document.getElementById("lessonOneMessageTwo").style.display = "block";
        document.getElementById("lessonOneButtonTwo").style.display = "block";
    }

    lessonOneButtonTwo() {
        document.getElementById("lessonOneMessageTwo").style.display = "none";
        document.getElementById("lessonOneButtonTwo").style.display = "none";
        document.getElementById("lessonOneMessageThree").style.display =
            "block";
        this.setState({
            checkNote: "C4",
            buttonToShow: "Three"
        });
        this.findPitch("C4");
    }

    lessonOneButtonThree() {
        document.getElementById("lessonOneMessageThree").style.display = "none";
        document.getElementById("lessonOneButtonThree").style.display = "none";
        document.getElementById("lessonOneMessageFour").style.display = "block";
        document.getElementById("lessonOneButtonFour").style.display = "block";
    }

    lessonOneButtonFour() {
        document.getElementById("lessonOneMessageFour").style.display = "none";
        document.getElementById("lessonOneButtonFour").style.display = "none";
        document.getElementById("lessonOneMessageFive").style.display = "block";
        this.setState({
            checkNote: "D4",
            buttonToShow: "Five"
        });
        this.findPitch("D4");
    }

    lessonOneButtonFive() {
        document.getElementById("lessonOneMessageFive").style.display = "none";
        document.getElementById("lessonOneButtonFive").style.display = "none";
        document.getElementById("lessonOneMessageSix").style.display = "block";
        document.getElementById("lessonOneButtonSix").style.display = "block";
    }

    lessonOneButtonSix() {
        document.getElementById("lessonOneMessageSix").style.display = "none";
        document.getElementById("lessonOneButtonSix").style.display = "none";
        document.getElementById("lessonOneMessageSeven").style.display =
            "block";
        this.setState({
            checkNote: "E4",
            buttonToShow: "Seven"
        });
        this.findPitch("E4");
    }

    lessonOneButtonSeven() {
        document.getElementById("lessonOneMessageSeven").style.display = "none";
        document.getElementById("lessonOneButtonSeven").style.display = "none";
        document.getElementById("lessonOneMessageEight").style.display =
            "block";
        document.getElementById("lessonOneButtonEight").style.display = "block";
    }

    lessonOneButtonEight() {
        document.getElementById("lessonOneMessageEight").style.display = "none";
        document.getElementById("lessonOneButtonEight").style.display = "none";
        document.getElementById("lessonOneMessageNine").style.display = "block";
        this.setState({
            checkNote: "F4",
            buttonToShow: "Nine"
        });
        this.findPitch("F4");
    }

    lessonOneButtonNine() {
        document.getElementById("lessonOneMessageNine").style.display = "none";
        document.getElementById("lessonOneButtonNine").style.display = "none";
        document.getElementById("lessonOneMessageTen").style.display = "block";
        document.getElementById("lessonOneButtonTen").style.display = "block";
    }

    lessonOneButtonTen() {
        document.getElementById("lessonOneMessageTen").style.display = "none";
        document.getElementById("lessonOneButtonTen").style.display = "none";
        document.getElementById("lessonOneMessageEleven").style.display =
            "block";
        this.setState({
            checkNote: "G4",
            buttonToShow: "Eleven"
        });
        this.findPitch("G4");
    }

    lessonOneButtonEleven() {
        document.getElementById("lessonOneMessageEleven").style.display =
            "none";
        document.getElementById("lessonOneButtonEleven").style.display = "none";
        document.getElementById("lessonOneMessageTwelve").style.display =
            "block";
        document.getElementById("lessonOneButtonTwelve").style.display =
            "block";
    }

    lessonOneButtonTwelve() {
        // set data to firebase that lesson one is completed for the user
        let that = this;
        let userLessonStatus = firebaseDB.ref(
            "/users/" + this.props.Auth.userId + "/lessonsCompleted"
        );

        //
        userLessonStatus.once("value").then(snapshot => {
            userLessonStatus.update({
                lesson1: {
                    completed: true,
                    time: firebase.database.ServerValue.TIMESTAMP
                }
            });
            that.props.LessonsCompleted.lessonsCompleted(snapshot.val());
            console.log(snapshot.val(), "lesson one completed");
            that.setState({
                lessonCompleted: true
            });
        });
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
        if (!this.props.Auth.online) {
            return <Redirect to="/" />;
        }

        if (this.state.lessonCompleted) {
            return <Redirect to="/" />;
        }

        return (
            <div
                style={{ height: "100vh", width: "100vw", textAlign: "center" }}
            >
            <script src="./jquery-1.7.2.min.js"></script>
    <script src="./jquery-ui-1.8.20.custom.min.js"></script>
                <div
                    style={{
                        width: "70vw",
                        height: "100vh",
                        margin: "auto",
                        backgroundColor: "white",
                        flex: 1,
                        overflowX: "scroll",
                        overflowY: "scroll"
                    }}
                >
                    <div className="row" style={{ height: "8em" }} />
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <span style={{ fontFamily: "helvetica" }}>
                                    {" "}
                                    <h2> Lesson One </h2>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4"> </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em"
                                }}
                                id="lessonOneMessageOne"
                            >
                                {" "}
                                Welcome to your first lesson! Today we will
                                learn how to play 5 notes!
                            </div>
                            <button
                                id="lessonOneButtonOne"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonOne()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageTwo"
                            >
                                {" "}
                                The first note we'll learn is middle C. Look at
                                the image to determine where middle C is located
                                on your piano. <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findMiddleC.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonTwo"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonTwo()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageThree"
                            >
                                {" "}
                                When you find it, play Middle C <br />
                                <img
                                    style={{ height: "12em", width: "15em" }}
                                    src={require("../static/200w_d.gif")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonThree"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonThree()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageFour"
                            >
                                {" "}
                                Excellent! Let's move on to the next note! The
                                white key to the right of C is D. <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/MiddleD.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonFour"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonFour()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageFive"
                            >
                                {" "}
                                Please play D! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/MiddleD.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonFive"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonFive()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageSix"
                            >
                                {" "}
                                Good Work! After D, the next white key to the
                                right is an E <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findE4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonSix"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonSix()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageSeven"
                            >
                                {" "}
                                Please play E!<br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findE4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonSeven"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonSeven()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageEight"
                            >
                                {" "}
                                Super! The next note to the right is F! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findF4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonEight"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonEight()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageNine"
                            >
                                {" "}
                                Please play F! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findF4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonNine"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonNine()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageTen"
                            >
                                {" "}
                                Great! The last note for this lesson is G.
                                Please find G. <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findG4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonTen"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonTen()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageEleven"
                            >
                                {" "}
                                Play G! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/findG4.jpg")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonEleven"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonEleven()}
                            >
                                {" "}
                                next{" "}
                            </button>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonOneMessageTwelve"
                            >
                                {" "}
                                Congrats! You have learned how to play your
                                first five notes on the piano. Please continue
                                to lesson two! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../static/goodJob.gif")}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonOneButtonTwelve"
                                className="btn btn-primary"
                                onClick={() => this.lessonOneButtonTwelve()}
                            >
                                {" "}
                                Finish{" "}
                            </button>
                            <Popup />
                        </div>
                    </div>
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
                </div>
            </div>
        );
    }
}
const LessonOneMapStateToProps = store => {
    return {
        Auth: store.Auth,
        LessonsCompleted: store.LessonsCompleted
    };
};

const LessonOneDispatch = dispatch => {
    return {
        AuthActions: bindActionCreators(AuthActions, dispatch),
        LessonsCompleted: bindActionCreators(LessonsCompleted, dispatch)
    };
};

export default connect(LessonOneMapStateToProps, LessonOneDispatch)(LessonOne);

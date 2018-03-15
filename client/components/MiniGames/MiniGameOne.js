import React, { Component } from "react";
import pitchTable from "../../helpers/pitchTable";
import { app, firebaseDB } from "../../firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Popup from "react-popup";
import Piano from "../Piano";

import * as MiniGamesCompleted from "../../actions/miniGamesCompletedActions";

import C4 from "../../static/C4.gif";
import D4 from "../../static/D4.jpeg";
import E4 from "../../static/E4.png";
import F4 from "../../static/F4.jpg";
import G4 from "../../static/G4.png";

class MiniGameOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guessNote: "",
            notePicture: {
                C4: C4,
                D4: D4,
                E4: E4,
                F4: F4,
                G4: G4
            },
            noteIsWrong: false,
            noteIsCorrect: false,
            countDown: 3,
            gameOver: false,
            previousHighScore: 0,
            lessonCompleted: false
        };
        this.score = 0;
        this.noteArray = [];
        this.notePicture = "";
        this.startGame = this.startGame.bind(this);
        this.findPitch = this.findPitch.bind(this);
        this.generateNewNote = this.generateNewNote.bind(this);
    }

    componentWillMount() {
        let that = this;
        let userMiniGameStatus = firebaseDB.ref(
            "/users/" +
                this.props.Auth.userId +
                "/miniGamesCompleted/miniGame1/highScore"
        );
        userMiniGameStatus.once("value").then(
            snapshot => {
                console.log(snapshot.val(), "componentDudlUnmount");
                if (snapshot.val()) {
                    that.setState({ previousHighScore: snapshot.val() });
                }
            },
            errorObject => {
                console.log("The read failed: " + errorObject.code);
            }
        );
    }

    componentWillUnmount() {
        if (this.audio) {
            this.audio.close();
        }
    }

    startGame() {
        let that = this;
        let flag = false;
        document.getElementById("countDown").style.display = "block";
        document.getElementById("startButton").style.display = "none";
        document.getElementById("gameRules").style.display = "none";
        function handleTimer() {
            if (that.state.countDown === 0 && !flag) {
                flag = true;
                that.state.countDown = 30;

                document.getElementById("guessNote").style.display = "block";
                document.getElementById("currentScore").style.display = "block";
                that.generateNewNote();
            } else if (that.state.countDown === 0 && flag) {
                clearInterval(timer);
                document.getElementById("countDown").style.display = "none";
                that.endGame();
                that.setState({ gameOver: true });
            } else {
                that.setState({ countDown: (that.state.countDown -= 1) });
            }
        }

        let timer = setInterval(() => {
            handleTimer();
        }, 1000);
    }

    endGame() {
        this.audio.close();
        let that = this;
        let lessonPopup = Popup.create({
            title: null,
            content: "Do you want to Play Again?",
            buttons: {
                left: [
                    {
                        text: "No",
                        className: "danger",
                        action: () => {
                            that.saveData();
                             that.setState({
                                lessonCompleted: true
                            })

                            Popup.close();
                        }
                    }
                ],
                right: [
                    {
                        text: "Yes",
                        key: "enter",
                        action: () => {
                            that.setState({ 
                                noteIsWrong: false,
                                noteIsCorrect: false,
                                countDown: 3,
                                gameOver: false,
                                previousHighScore: Math.max(
                                    that.score,
                                    that.state.previousHighScore
                                ),
                                lessonCompleted: false
                            })
                            that.saveData();
                            Popup.close();
                            that.startGame()
                            that.score = 0
                        }
                    }
                ]
            }
        });
    }

    saveData(){
        let that = this
        let userMiniGameStatus = firebaseDB.ref(
            "/users/" + this.props.Auth.userId + "/miniGamesCompleted"
        );

        userMiniGameStatus.once("value").then(snapshot => {
            userMiniGameStatus.update({
                miniGame1: {
                    completed: true,
                    highScore: Math.max(
                        that.score,
                        that.state.previousHighScore
                    )
                }
            });
            that.props.MiniGamesCompleted.miniGamesCompleted({
                miniGame1: Math.max(that.score, that.state.previousHighScore)
            });
        });
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
            analyserAudioNode;

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
                if (that.audio) {
                    that.audio.close();
                }
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
                that.noteArray.push(note);
                if (that.noteArray.length > 2) {
                    if (that.noteArray.includes(matchNote)) {
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        that.setState({
                            noteIsCorrect: true,
                            noteIsWrong: false
                        });
                        that.score += 1;
                        console.log(that.noteArray, "look here");
                        setTimeout(() => that.generateNewNote(), 400);
                    } else {
                        that.setState({
                            noteIsWrong: true,
                            noteIsCorrect: false
                        });
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        setTimeout(
                            () => that.setState({ noteIsWrong: false }),
                            500
                        );
                        that.toggleMicrophone();
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
            analyserAudioNode.fftSize = 2048;
            sourceAudioNode = audioContext.createMediaStreamSource(micStream);
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

    generateNewNote() {
        this.setState({ noteIsCorrect: false });
        let notes = ["C4", "D4", "E4", "F4", "G4"];
        let randomNumber = Math.floor(Math.random() * 5);
        this.setState({ guessNote: notes[randomNumber] });
        this.findPitch(notes[randomNumber]);
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
                <div
                    style={{
                        width: "80vw",
                        height: "100vh",
                        margin: "auto",
                        backgroundColor: "white",
                        flex: 1
                    }}
                    className="effect8 wow fadeIn"
                >
                    <div className="row" style={{ height: "8em" }} />
                    <div className="row">
                        <div className="col-md-12">
                            <Popup />
                            <div>
                                <span
                                    style={{
                                        fontFamily: "helvetica",
                                        fontSize: "5em"
                                    }}
                                >
                                    <h2>Mini Game One</h2>
                                </span>
                            </div>
                            <div
                                id="gameRules"
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "2em"
                                }}
                            >
                                <p>
                                    {" "}
                                    Rules: Notes will flash on the screen. Play
                                    the correct note as fast as you can for
                                    thirty seconds! And try to beat your high
                                    score!
                                </p>
                                <img
                                    className="span3 wow bounceInDown center"
                                    style={{
                                        height: "8em",
                                        width: "8em",
                                        padding: "1em",
                                        visibility: "visible",
                                        animationDelay: "0.5s"
                                    }}
                                    src={require("../../static/pianoSlide.png")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                id="redX"
                                className="span3 wow flipInX center"
                                style={{
                                    height: "10vh",
                                    width: "5vw",
                                    margin: "auto",
                                    marginTop: "20vh",
                                    visibility: "visible",
                                    animationName: "flipInX",
                                    display: this.state.noteIsWrong
                                        ? "block"
                                        : "none"
                                }}
                                src={require("../../static/redX.png")}
                            />
                        </div>
                        <div className="col-md-4">
                            <span
                                id="countDown"
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                            >
                                {" "}
                                {this.state.countDown}{" "}
                            </span>
                            <img
                                id="guessNote"
                                style={{
                                    height: "40vh",
                                    width: "12vw",
                                    margin: "auto",
                                    marginTop: "8vh",
                                    display: "none"
                                }}
                                src={
                                    this.state.notePicture[this.state.guessNote]
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <img
                                id="greenCheck"
                                className="span3 wow flipInX center"
                                style={{
                                    height: "10vh",
                                    width: "5vw",
                                    marginTop: "20vh",
                                    visibility: "visible",
                                    animationName: "flipInX",
                                    display: this.state.noteIsCorrect
                                        ? "block"
                                        : "none"
                                }}
                                src={require("../../static/greenCheck.png")}
                            />
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        id="startButton"
                        onClick={() => this.startGame()}
                    >
                        {" "}
                        Ready{" "}
                    </button>
                    <div
                        style={{
                            fontSize: "2.5em",
                            fontFamily: "helvetica",
                            display: "none"
                        }}
                        id="currentScore"
                    >
                        <div>Score: {this.score} </div>
                        <div>
                            Previous High Score: {this.state.previousHighScore}
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
                            src={require("../../static/pianoKeys.png")}
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

const mapStateToProps = store => {
    return {
        Auth: store.Auth
    };
};

const miniGameDispatch = dispatch => {
    return {
        MiniGamesCompleted: bindActionCreators(MiniGamesCompleted, dispatch)
    };
};

export default connect(mapStateToProps, miniGameDispatch)(MiniGameOne);

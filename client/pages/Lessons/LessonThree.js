import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import Popup from "react-popup";
import { bindActionCreators } from "redux";

import { app, firebaseDB } from "~/firebase";
import * as AuthActions from "~/actions/authActions.js";
import * as LessonsCompletedActions from "~/actions/lessonsCompletedActions";
import pitchTable from "~/helpers/pitchTable";
import Piano from "~/components/Piano.js";
import easySongView from "~/helpers/easySongView"
import noteTransition from "~/helpers/noteTransition"
import * as secret from "../../../secret.json";


class LessonThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctNote: null,
            wrongNote: null,
            checkNote: null,
            buttonToShow: null,
            lessonCompleted: false,
            noteClass: ""
        };
        this.lessonNotes = ["E4", "D4", "C4", "D4", "E4", "E4", "E4", "D4", "D4", "D4", "E4", "G4", "G4", "E4", "D4", "C4", "D4", "E4", "E4", "E4", "E4", "D4", "D4", "E4", "D4", "C4"]
        this.popUpCount = 1;
        this.correctAnswers = 1;
        this.noteArray = [];
        this.findPitch = this.findPitch.bind(this);
        this.lessonThreeButtonTwo = this.lessonThreeButtonTwo.bind(this);
        this.finishSong = this.finishSong.bind(this);
    }

    componentDidUpdate() {
        if (this.correctAnswers <= this.lessonNotes.length){
            if (
                this.state.correctNote === this.state.checkNote &&
                this.popUpCount === this.correctAnswers &&
                !this.state.lessonCompleted
            ) {

                noteTransition("MaryHad", this.correctAnswers)
                this.turnOffMicrophone();
                this.audio.close()
                for ( let i = 1; i <= this.lessonNotes.length; i++ ){
                    if (this.correctAnswers === i && (this.lessonNotes[i] === this.lessonNotes[i - 1]) ){
                        this.setState({
                            correctNote: null
                        });
                        setTimeout(()=>{this.findPitch(this.lessonNotes[i])},300)
                        this.popUpCount += 1;
                        this.correctAnswers += 1;
                        break;
                    }
                   else if (this.correctAnswers === i) {
                        this.setState({
                            checkNote: this.lessonNotes[i],
                        });
                        setTimeout(()=>{this.findPitch(this.lessonNotes[i])},200)
                        this.popUpCount += 1;
                        this.correctAnswers += 1;
                        break;
                   } else if (this.correctAnswers === this.lessonNotes.length){
                        this.turnOffMicrophone();
                        this.audio.close()
                        this.finishSong()
                        this.correctAnswers += 1;
                        break;
                   }
                }
            } else if (
                this.state.wrongNote &&
                this.noteArray.length &&
                this.popUpCount === this.correctAnswers &&
                !this.state.lessonCompleted
            ) {
            }
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
                that.noteArray.push(note);
                if (
                    (note === "D4" && that.noteArray.length === 1) || 
                    (note === "C4" && that.noteArray.length === 1)
                ) {
                    that.noteArray.push(note);
                    that.noteArray.push(note);
                }
                if (that.noteArray.length === 3) {
                    if (that.noteArray.includes(matchNote)) {
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        that.setState({
                            correctNote: matchNote,
                            wrongNote: null,
                            noteClass: "correctNote"
                        });
                        console.log(that.noteArray, 'note array correct')
                    } else {
                        if (that.state.noteClass === "wrongNote"){
                            that.setState({
                                noteClass: ""
                            })
                            setTimeout(()=>{
                                that.setState({
                                    noteClass: "wrongNote"
                                })
                            }, 150)
                        } else {
                            that.setState({
                                wrongNote: that.noteArray[2],
                                noteClass: "wrongNote"
                            });
                            
                        }
                        console.log(that.noteArray, "note array wrong");
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        setTimeout(() => {
                            that.toggleMicrophone();
                        }, 500);
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
            let that = this
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

    lessonThreeButtonOne() {
        document.getElementById("lessonThreeMessageOne").style.display = "none";
        document.getElementById("lessonThreeButtonOne").style.display = "none";
        document.getElementById("lessonThreeMessageTwo").style.display = "block";
        document.getElementById("lessonThreeButtonTwo").style.display = "block";
    }

    lessonThreeButtonTwo() {
        document.getElementById("lessonThreeMessageTwo").style.display = "none";
        document.getElementById("lessonThreeButtonTwo").style.display = "none";
        document.getElementById("lessonThreeMessageThree").style.display = 
            "block";
        this.setState({
            checkNote: "E4",
            buttonToShow: "Three"
        });
        this.findPitch("E4");
    }

    finishSong() {
        document.getElementById("lessonThreeMessageThree").style.display = "none";
        document.getElementById("lessonThreeMessageFour").style.display = "block";
        document.getElementById("lessonThreeButtonFour").style.display = "block";
    }


    finishLesson() {
        // set data to firebase that lesson one is completed for the user
        let that = this;
        let userLessonStatus = firebaseDB.ref(
            "/users/" + this.props.Auth.userId + "/lessonsCompleted"
        );

        //
        userLessonStatus.once("value").then(snapshot => {
            userLessonStatus.update({
                lesson3: {
                    completed: true,
                    time: firebase.database.ServerValue.TIMESTAMP
                }
            });
            that.props.LessonsCompletedActions.lessonsCompleted(snapshot.val());
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
            return <Redirect push to="/" />;
        }

        let MaryNotes = []
        for (let i = 1; i <= this.lessonNotes.length + 4; i++) {
            MaryNotes.push( easySongView(this.lessonNotes[i-1], i, this.correctAnswers, this.state.noteClass, "MaryHad", this.lessonNotes.length) )
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
                        flex: 1,
                        overflowX: "scroll",
                        overflowY: "scroll"
                    }}
                    className="effect8 wow fadeIn"
                >
                    <div className="row" style={{ height: "8em" }} />
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <span style={{ fontFamily: "helvetica" }}>
                                    {" "}
                                    <h2> Lesson Three </h2>
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
                                id="lessonThreeMessageOne"
                            >
                                {" "}
                                Welcome to your Third lesson! Today we will
                                play through a song!
                            </div>
                            <button
                                id="lessonThreeButtonOne"
                                className="btn btn-primary"
                                onClick={() => this.lessonThreeButtonOne()}
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
                                id="lessonThreeMessageTwo"
                            >
                                {" "}
                                Let's look at Mary Had A Little Lamb. Please play through the notes 
                                on the screen. Don't worry about rhythm just yet.
                                <br/>{" "}
                                <div className="row">
                                    <div className = "sheetMusicContainer col-md-10">
                                        <img
                                            className = "sheetMusicStaff"

                                            src={`${secret.SampleUrl}/static/sheetMusic1.png`}
                                        />
                                        <img
                                            className="playMusicNote noteOrderFirst noteE4 "
                                            src={`${secret.SampleUrl}/static/quarterNote.png`}
                                        />
                                         <img
                                            className="playMusicNote noteOrderSecond noteD4"
                                            src={`${secret.SampleUrl}/static/quarterNote.png`}
                                        />
                                        <img
                                            className="playMusicNote noteOrderThird noteC4"
                                            src={`${secret.SampleUrl}/static/musicNoteLine.png`}
                                        />
                                        <img
                                            className="playMusicNote noteOrderFourth noteD4"
                                            src={`${secret.SampleUrl}/static/quarterNote.png`}
                                        />
                                    </div> 
                                </div>
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonThreeButtonTwo"
                                className="btn btn-primary"
                                onClick={() => this.lessonThreeButtonTwo()}
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
                                id="lessonThreeMessageThree"
                            >
                                {" "}
                                Go!
                                <br/>{" "}
                                <div className="row">
                                    <div className = "sheetMusicContainer col-md-10">
                                        <img
                                            className = "sheetMusicStaff"

                                            src={`${secret.SampleUrl}/static/sheetMusic1.png`}
                                        />
                                       {MaryNotes}
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div
                                style={{
                                    fontFamily: "helvetica",
                                    fontSize: "1.5em",
                                    display: "none"
                                }}
                                id="lessonThreeMessageFour"
                            >
                                {" "}
                                Congrats! You have played through your first song. Please play through more songs in the song collection before moving to the next lesson! <br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={`${secret.SampleUrl}/static/goodJob.gif`}
                                />
                                <br />
                            </div>
                            <button
                                style={{
                                    display: "none",
                                    margin: "auto",
                                    marginTop: "1em"
                                }}
                                id="lessonThreeButtonFour"
                                className="btn btn-primary"
                                onClick={() => this.finishLesson()}
                            >
                                {" "}
                                Finish{" "}
                            </button>
                            <Popup />
                        </div>
                    </div>
                    <div
                        id="showPianoButton"
                        style={{ cursor: "pointer"}}
                        onClick={() => this.showPiano()}
                    >
                        <img
                            className="wow rollIn"
                            style={{
                                height: "4em",
                                width: "4em",
                                margin: ".5em"
                            }}
                            src={`${secret.SampleUrl}/static/pianoKeys.png`}
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
const LessonThreeMapStateToProps = store => {
    return {
        Auth: store.Auth,
        LessonsCompleted: store.LessonsCompleted
    };
};

const LessonThreeDispatch = dispatch => {
    return {
        AuthActions: bindActionCreators(AuthActions, dispatch),
        LessonsCompletedActions: bindActionCreators(LessonsCompletedActions, dispatch)
    };
};

export default connect(LessonThreeMapStateToProps, LessonThreeDispatch)(LessonThree);

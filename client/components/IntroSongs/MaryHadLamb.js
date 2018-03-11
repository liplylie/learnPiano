import React, { Component } from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { app, firebaseDB } from "../../firebase";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "../../actions/authActions.js";
import * as LessonsCompleted from "../../actions/lessonsCompletedActions";
import Popup from "react-popup";
import pitchTable from "../../helpers/pitchTable";
import pitchTablePictures from "../../helpers/pitchTablePictures";
import Piano from "../Piano.js";

class MaryHadLamb extends Component {
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
        this.start = false
        this.lessonNotes = ["E4", "D4", "C4", "D4", "E4", "E4", "E4", "D4", "D4", "D4", "D4", "E4", "D4", "D4", "E4", "D4", "C4", "D4", "E4", "E4", "E4", "E4", "D4", "D4", "E4", "D4", "C4"]
        this.popUpCount = 1;
        this.correctAnswers = 1;
        this.noteArray = [];
        this.findPitch = this.findPitch.bind(this);
        this.lessonThreeButtonTwo = this.lessonThreeButtonTwo.bind(this);
        this.finishSong = this.finishSong.bind(this);
    }

    componentDidUpdate() {
        if (this.correctAnswers < 27 && this.start){
        let getCssProperty = (elmId, property) => {
            let elem = document.getElementById(elmId);
            return window.getComputedStyle(elem,null).getPropertyValue(property);
        }

        if (
            this.state.correctNote === this.state.checkNote &&
            this.popUpCount === this.correctAnswers &&
            !this.state.lessonCompleted
        ) {
            let noteOne = getCssProperty("MaryHad1", "left");
            noteOne = Number(noteOne.substring(0, noteOne.length - 2))
            let noteTwo = getCssProperty("MaryHad2", "left")
            noteTwo = Number(noteTwo.substring(0, noteTwo.length - 2))
            let noteThree = getCssProperty("MaryHad3", "left")
            noteThree = Number(noteThree.substring(0, noteThree.length - 2))
            let noteFour = getCssProperty("MaryHad4", "left")
            noteFour = Number(noteFour.substring(0, noteFour.length - 2))
            let movingDistance = noteTwo - noteOne
            let moveFirst = () => {
                if (noteOne <= 100){
                    clearInterval(moveFirstNote)
                    document.getElementById(`MaryHad1`).style.display = "none"
                    document.getElementById(`MaryHad1`).id = ""
                } else {
                    noteOne -= 10
                    document.getElementById(`MaryHad1`).style.left = noteOne + "px"
                }
            }
            let moveFirstNote = setInterval(moveFirst, 20)
            let moveOthers = () => {
                if (movingDistance <=0){
                    clearInterval(moveOtherNotes)
                    console.log(this.correctAnswers, 'look bro')
                    document.getElementById(`MaryHad${this.correctAnswers + 3}`).style.display = "block"
                    document.getElementById(`MaryHad2`).id = "MaryHad1"
                    document.getElementById(`MaryHad3`).id = "MaryHad2"
                    document.getElementById(`MaryHad4`).id = "MaryHad3"
                    document.getElementById(`MaryHad${this.correctAnswers + 3}`).id = "MaryHad4"
                } else {
                    noteTwo -= 10
                    noteThree -= 10
                    noteFour -= 10
                    movingDistance -= 10
                    document.getElementById(`MaryHad2`).style.left = noteTwo + "px"
                    document.getElementById(`MaryHad3`).style.left = noteThree + "px"
                    document.getElementById(`MaryHad4`).style.left = noteFour + "px"
                }
            }
            let moveOtherNotes = setInterval(moveOthers, 20)

            this.turnOffMicrophone();
            this.audio.close()
            if (this.correctAnswers === 1){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 2){
                this.setState({
                    checkNote: "C4",
                });
                setTimeout(()=>{this.findPitch("C4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 3){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 4){
                this.setState({
                    checkNote: "E4",
                });
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 5){
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 6){
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 7){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 8){
                setTimeout(()=>{this.findPitch("D4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 9){
                setTimeout(()=>{this.findPitch("D4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 10){
                this.setState({
                    checkNote: "E4",
                });
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 11){
                this.setState({
                    checkNote: "G4",
                });
                setTimeout(()=>{this.findPitch("G4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 12){
                setTimeout(()=>{this.findPitch("G4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 13){
                this.setState({
                    checkNote: "E4",
                });
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 14){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 15){
                this.setState({
                    checkNote: "C4",
                });
                setTimeout(()=>{this.findPitch("C4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 16){
                this.setState({
                    checkNote: "D4",
                });
               setTimeout(()=>{this.findPitch("D4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 17){
                this.setState({
                    checkNote: "E4",
                });
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 18){
                setTimeout(()=>{this.findPitch("E4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 19){
                setTimeout(()=>{this.findPitch("E4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 20){
                setTimeout(()=>{this.findPitch("E4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 21){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 22){
                setTimeout(()=>{this.findPitch("D4")},300)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 23){
                this.setState({
                    checkNote: "E4",
                });
                setTimeout(()=>{this.findPitch("E4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 24){
                this.setState({
                    checkNote: "D4",
                });
                setTimeout(()=>{this.findPitch("D4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 25){
                this.setState({
                    checkNote: "C4",
                });
                setTimeout(()=>{this.findPitch("C4")},200)
                this.popUpCount += 1;
            this.correctAnswers += 1;
            } else if (this.correctAnswers === 26){
                this.turnOffMicrophone();
            this.audio.close()
            this.finishSong()
            this.correctAnswers += 1;
            }
        } 
    //     else if (
    //         this.state.wrongNote &&
    //         this.noteArray.length &&
    //         this.popUpCount === this.correctAnswers &&
    //         !this.state.lessonCompleted
    //     ) {
    //     }
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
                        that.noteArray.length = 0
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
                            }, 200)
                        } else {
                            that.setState({
                                wrongNote: that.noteArray[2],
                                noteClass: "wrongNote"
                            });
                            
                        }
                        console.log(that.noteArray, "note array wrong");
                        that.turnOffMicrophone();
                        that.noteArray = [];
                        that.noteArray.length = 0
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

    lessonThreeButtonTwo() {
        this.start = true
        document.getElementById("lessonThreeButtonOne").style.display = "none";
        document.getElementById("lessonThreeMessageThree").style.display = 
            "block";
        this.setState({
            checkNote: "E4",
            buttonToShow: "Three"
        });
        this.findPitch("E4");
    }

    finishSong() {
        console.log("done")
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
            that.props.LessonsCompleted.lessonsCompleted(snapshot.val());
            console.log(snapshot.val(), "lesson three completed");
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
                                    <h2> Mary Had A Little Lamb </h2>
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
                                Get ready to play Mary Had A Little Lamb!
                            </div>
                            <button
                                id="lessonThreeButtonOne"
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

                                            src={require("../../static/sheetMusic1.png")}
                                        />
                                        <img
                                            id="MaryHad1"
                                            className={`playMusicNote noteOrderFirst noteE4 ${this.state.noteClass} `}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad2"
                                            className={`playMusicNote noteOrderSecond noteD4 ${this.correctAnswers === 2 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad3"
                                            className={`playMusicNote noteOrderThird noteC4 ${this.correctAnswers === 3 ? this.state.noteClass : ""}`}
                                            src={require("../../static/musicNoteLine.png")}
                                        />
                                        <img
                                            id="MaryHad4"
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 4 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad5"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 5 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad6"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 6 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad7"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 7 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad8"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 8 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad9"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 9 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad10"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 10 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad11"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 11 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad12"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteG4 ${this.correctAnswers === 12 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad13"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteG4 ${this.correctAnswers === 13 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad14"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 14 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad15"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 15 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad16"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteC4 ${this.correctAnswers === 16 ? this.state.noteClass : ""}`}
                                            src={require("../../static/musicNoteLine.png")}
                                        />
                                        <img
                                            id="MaryHad17"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 17 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad18"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 18 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad19"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 19 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad20"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 20 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad21"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 21 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad22"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 22 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad23"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 23 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad24"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteE4 ${this.correctAnswers === 24 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                         <img
                                            id="MaryHad25"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteD4 ${this.correctAnswers === 25 ? this.state.noteClass : ""}`}
                                            src={require("../../static/quarterNote.png")}
                                        />
                                        <img
                                            id="MaryHad26"
                                            style={{display:"none"}}
                                            className={`playMusicNote noteOrderFourth noteC4 ${this.correctAnswers === 26 ? this.state.noteClass : ""}`}
                                            src={require("../../static/musicNoteLine.png")}
                                        />
                                         <img
                                            id="MaryHad27"
                                            style={{display:"none", left: 0}}
                                        />
                                        <img
                                            id="MaryHad28"
                                            style={{display:"none", left: 0}}
                                        />
                                        <img
                                            id="MaryHad29"
                                            style={{display:"none", left: 0}}
                                        />
                                         <img
                                            id="MaryHad30"
                                            style={{display:"none", left: 0}}
                                        />
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
                                Congrats! You have played through Mary Had A Little Lamb!<br />{" "}
                                <img
                                    style={{ height: "50vh", width: "60vw" }}
                                    src={require("../../static/goodJob.gif")}
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
const MaryHadLambMapStateToProps = store => {
    return {
        Auth: store.Auth,
        LessonsCompleted: store.LessonsCompleted
    };
};

const MaryHadLambDispatch = dispatch => {
    return {
        AuthActions: bindActionCreators(AuthActions, dispatch),
        LessonsCompleted: bindActionCreators(LessonsCompleted, dispatch)
    };
};

export default connect(MaryHadLambMapStateToProps, MaryHadLambDispatch)(MaryHadLamb);

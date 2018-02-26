import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { app, firebaseDB } from '../firebase'
import firebase from "firebase"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'
import * as LessonsCompleted from '../actions/lessonsCompletedActions'
import Popup from 'react-popup'
import pitchTable from "../helpers/pitchTable"
import pitchTablePictures from "../helpers/pitchTablePictures"

class LessonTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correctNote: null,
      wrongNote: null,
      checkNote: null,
      buttonToShow: null,
      lessonCompleted: false
    }
    this.popUpCount = 1
    this.correctAnswers = 1
    this.noteArray = []
    this.findPitch = this.findPitch.bind(this)
    this.lessonTwoButtonTwo = this.lessonTwoButtonTwo.bind(this)
    this.lessonTwoButtonFour = this.lessonTwoButtonFour.bind(this)
    this.lessonTwoButtonSeven = this.lessonTwoButtonSeven.bind(this)
    
  }

  componentDidUpdate(){
    if (this.state.correctNote === this.state.checkNote && this.popUpCount === this.correctAnswers && !this.state.lessonCompleted){
        Popup.alert(<div style={{fontFamily:"helvetica", fontSize:"2.5em"}}><img style={{height: "8em", width: "5em"}} src={pitchTablePictures[this.state.checkNote]}/> Correct! You played a {this.state.checkNote[0]} </div>)
        document.getElementById(`lessonTwoButton${this.state.buttonToShow}`).style.display = "block"
        this.popUpCount+=1
        this.correctAnswers+=1
        this.turnOffMicrophone()
    } else if (this.state.wrongNote && this.noteArray.length && this.popUpCount === this.correctAnswers && !this.state.lessonCompleted){
      Popup.alert(<div style={{fontFamily:"helvetica", fontSize:"2.5em"}}><img style={{height: "8em", width: "5em"}} src={pitchTablePictures[this.state.wrongNote]} /> Incorrect! You played a {this.state.wrongNote[0]}</div>)
    }
  }

  componentWillUnmount(){
    if (this.audio){
      this.audio.close()
    }
  }

  findPitch(matchNote){
    let that = this
    var baseFreq = 440;
    var currentNoteIndex = 57; // A4
    var isRefSoundPlaying = false;
    var isMicrophoneInUse = false;
    var frameId,
        freqTable,
        gauge,
        micStream,
        notesArray,
        audioContext,
        sourceAudioNode,
        analyserAudioNode;


    var isAudioContextSupported = function () {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (window.AudioContext) {
            return true;
        }
        else {
            return false;
        }
    };

    var reportError = function (message) {
    };

    var init = function () {
        freqTable = pitchTable

        if (isAudioContextSupported()) {
            audioContext = new window.AudioContext();
            that.audio = audioContext
        }
        else {
            reportError('AudioContext is not supported in this browser');
        }
    };

    var updatePitch = function (pitch) {
    };

    var updateNote = function (note) {
      if (note !== "--" && note.indexOf("7") === -1 && note.indexOf("8") === -1 ){
            console.log(note, 'note')
            that.noteArray.push(note)
            if( ( note.includes("3") && that.noteArray.length === 1 ) || ( note === "D4" && that.noteArray.length === 1) ){
                that.noteArray.push(note)
                that.noteArray.push(note)
            }
        if (that.noteArray.length === 3){
          if (that.noteArray.includes(matchNote)){
            that.turnOffMicrophone()
            that.noteArray = []
            that.setState({
              correctNote: matchNote
          }) 
          } else {
                that.setState({
                wrongNote: that.noteArray[2]
                })
                console.log(that.noteArray, 'note array')
                that.turnOffMicrophone()
                that.noteArray = []
                if ( document.getElementsByClassName("mm-popup__btn mm-popup__btn--ok") ) {
                let okButton = document.getElementsByClassName("mm-popup__btn mm-popup__btn--ok")[0]
                console.log(okButton, "okbutton")
                setTimeout(() => {okButton.click()}, 1000)
                }
                //that.toggleMicrophone()
                setTimeout(()=>{that.toggleMicrophone()}, 700)
                }
            }
        }
    }

    var updateCents = function (cents) {
    };

    var isGetUserMediaSupported = function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia) {
            return true;
        }
        return false;
    };

    var findFundamentalFreq = function (buffer, sampleRate) {
        var n = 1024;
        var bestK = -1;
        var bestR = 0;
        for (var k = 8; k <= 1000; k++) {
            var sum = 0;
            for (var i = 0; i < n; i++) {
                sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
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
        }
        else {
            return -1;
        }
    };

    var findClosestNote = function (freq, notes) {
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
        if (Math.abs(notes[high].frequency - freq) <= Math.abs(notes[low].frequency - freq)) {
            return notes[high];
        }
        return notes[low];
    };

    var findCentsOffPitch = function (freq, refFreq) {
        var log2 = 0.6931471805599453; // Math.log(2)
        var multiplicativeFactor = freq / refFreq;
        var cents = Math.floor(1200 * (Math.log(multiplicativeFactor) / log2));
        return cents;
    };

    var detectPitch = function () {
        var buffer = new Uint8Array(analyserAudioNode.fftSize);
        analyserAudioNode.getByteTimeDomainData(buffer);
        var fundalmentalFreq = findFundamentalFreq(buffer, audioContext.sampleRate);
        if (fundalmentalFreq !== -1) {
            var note = findClosestNote(fundalmentalFreq, notesArray);
            var cents = findCentsOffPitch(fundalmentalFreq, note.frequency);
            updateNote(note.note);
            updateCents(cents);
        }
        else {
            updateNote('--');
            updateCents(-50);
        }
        frameId = window.requestAnimationFrame(detectPitch);
    };

    var streamReceived = function (stream) {
        micStream = stream;
        analyserAudioNode = audioContext.createAnalyser();
        analyserAudioNode.fftSize = 2048;
        sourceAudioNode = audioContext.createMediaStreamSource(micStream);
        sourceAudioNode.connect(analyserAudioNode);
        detectPitch();
    };

    var turnOffReferenceSound = function () {
        sourceAudioNode.stop();
        sourceAudioNode = null;
        updatePitch('--');
        updateNote('--');
        isRefSoundPlaying = false;
    };

    this.turnOffMicrophone = function() {
        if (sourceAudioNode && sourceAudioNode.mediaStream && sourceAudioNode.mediaStream.stop) {
            sourceAudioNode.mediaStream.stop();
        }
        sourceAudioNode = null;
        updatePitch('--');
        updateNote('--');
        updateCents(-50);
        analyserAudioNode = null;
        window.cancelAnimationFrame(frameId);
        isMicrophoneInUse = false;
    };

    this.toggleMicrophone = function () {
        if (isRefSoundPlaying) {
            turnOffReferenceSound();
        }

        if (!isMicrophoneInUse) {
            if (isGetUserMediaSupported()) {
                notesArray = freqTable[baseFreq.toString()];
                var getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ?
                    navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) :
                    function (constraints) {
                        return new Promise(function (resolve, reject) {
                            navigator.getUserMedia(constraints, resolve, reject);
                        });
                    };
                getUserMedia({audio: true}).then(streamReceived).catch(reportError);
                updatePitch(baseFreq);
                isMicrophoneInUse = true;
            }
            else {
                reportError('It looks like this browser does not support getUserMedia. ' +
                'Check <a href="http://caniuse.com/#feat=stream">http://caniuse.com/#feat=stream</a> for more info.');
            }
        }
        else {
            this.turnOffMicrophone();
        }
    };

    var toggleReferenceSound = function () {
        if (isMicrophoneInUse) {
            this.toggleMicrophone();
        }
        if (!isRefSoundPlaying) {
            notesArray = freqTable[baseFreq];
            sourceAudioNode = audioContext.createOscillator();
            sourceAudioNode.frequency.value = notesArray[currentNoteIndex].frequency;
            sourceAudioNode.connect(audioContext.destination);
            sourceAudioNode.start();
            updatePitch(notesArray[currentNoteIndex].frequency);
            updateNote(notesArray[currentNoteIndex].note);
            isRefSoundPlaying = true;
        } else {
            turnOffReferenceSound();
        }
    };

    var changeBaseFreq = function (delta) {
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

    var changeReferenceSoundNote = function (delta) {
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

    var baseFreqChangeHandler = function (event) {
        changeBaseFreq(event.data);
    };

    var referenceSoundNoteHandler = function (event) {
        changeReferenceSoundNote(event.data);
    };

    init()
    this.toggleMicrophone()    
  }

  lessonTwoButtonOne(){
    document.getElementById("lessonTwoMessageOne").style.display = "none"
    document.getElementById("lessonTwoButtonOne").style.display = "none"
    document.getElementById("lessonTwoMessageTwo").style.display = "block"
    document.getElementById("lessonTwoButtonTwo").style.display = "block"
    
  }

  lessonTwoButtonTwo(){
    document.getElementById("lessonTwoMessageTwo").style.display = "none"
    document.getElementById("lessonTwoButtonTwo").style.display = "none"
    document.getElementById("lessonTwoMessageThree").style.display = "block"
    this.setState({
      checkNote : "C4",
      buttonToShow: "Three"
    })
    this.findPitch("C4")

  }

  lessonTwoButtonThree(){
    document.getElementById("lessonTwoMessageThree").style.display = "none"
    document.getElementById("lessonTwoButtonThree").style.display = "none"
    document.getElementById("lessonTwoMessageFour").style.display = "block"
    document.getElementById("lessonTwoButtonFour").style.display = "block"
  }

  lessonTwoButtonFour(){
    document.getElementById("lessonTwoMessageFour").style.display = "none"
    document.getElementById("lessonTwoButtonFour").style.display = "none"
    document.getElementById("lessonTwoMessageFive").style.display = "block"
    this.setState({
      checkNote : "B3",
      buttonToShow: "Five"
    })
    this.findPitch("B3")
  }

  lessonTwoButtonFive(){
    document.getElementById("lessonTwoMessageFive").style.display = "none"
    document.getElementById("lessonTwoButtonFive").style.display = "none"
    document.getElementById("lessonTwoMessageSix").style.display = "block"
    document.getElementById("lessonTwoButtonSix").style.display = "block"
  }

  lessonTwoButtonSix(){
    document.getElementById("lessonTwoMessageSix").style.display = "none"
    document.getElementById("lessonTwoButtonSix").style.display = "none"
    document.getElementById("lessonTwoMessageSeven").style.display = "block"
    this.setState({
      checkNote : "A3",
      buttonToShow: "Seven"
    })
    this.findPitch("A3")
  }

  lessonTwoButtonSeven(){
    document.getElementById("lessonTwoMessageSeven").style.display = "none"
    document.getElementById("lessonTwoButtonSeven").style.display = "none"
    document.getElementById("lessonTwoMessageEight").style.display = "block"
    document.getElementById("lessonTwoButtonEight").style.display = "block"
  }

  lessonTwoButtonEight(){
    document.getElementById("lessonTwoMessageEight").style.display = "none"
    document.getElementById("lessonTwoButtonEight").style.display = "none"
    document.getElementById("lessonTwoMessageNine").style.display = "block"
    this.setState({
      checkNote : "G3",
      buttonToShow: "Nine"
    })
    this.findPitch("G3")
  }
  
  lessonTwoButtonNine(){
    document.getElementById("lessonTwoMessageNine").style.display = "none"
    document.getElementById("lessonTwoButtonNine").style.display = "none"
    document.getElementById("lessonTwoMessageTen").style.display = "block"
    document.getElementById("lessonTwoButtonTen").style.display = "block"
  }

  lessonTwoButtonTen(){
    document.getElementById("lessonTwoMessageTen").style.display = "none"
    document.getElementById("lessonTwoButtonTen").style.display = "none"
    document.getElementById("lessonTwoMessageEleven").style.display = "block"
    this.setState({
      checkNote : "F3",
      buttonToShow: "Eleven"
    })
    this.findPitch("F3")
  }

  lessonTwoButtonEleven(){
    document.getElementById("lessonTwoMessageEleven").style.display = "none"
    document.getElementById("lessonTwoButtonEleven").style.display = "none"
    document.getElementById("lessonTwoMessageTwelve").style.display = "block"
    document.getElementById("lessonTwoButtonTwelve").style.display = "block"
  }

  lessonTwoButtonTwelve(){
    let that = this
    let userLessonStatus = firebaseDB.ref("/users/" + this.props.Auth.userId + "/lessonsCompleted")
    
    userLessonStatus.once("value")
        .then(snapshot => {
            userLessonStatus.update( {lesson2: {completed: true, time: firebase.database.ServerValue.TIMESTAMP} })
            that.props.LessonsCompleted.lessonsCompleted(snapshot.val())
            console.log( snapshot.val(), 'lesson two completed' )
            that.setState({
                lessonCompleted: true
            })
    })
  }

  render() {

    if (!this.props.Auth.online ){
      return <Redirect to="/"/>
    }

    if (this.state.lessonCompleted ){
      return <Redirect to="/"/>
    }

    return (
      <div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
        <div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1,  overflowX: "scroll", overflowY: "scroll"}}>
          <div className="row" style={{height: "8em"}}>
          </div>
          <div className="row">
            <div className="col-md-12"> 
              <div><span style={{fontFamily: "helvetica", fontSize: "5em"}}> Lesson Two</span></div>
            </div>
            <div className="col-md-4"> </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div style={{fontFamily: "helvetica", fontSize: "1.5em"}} id="lessonTwoMessageOne"> Welcome back! Get ready for Lesson 2! Today we will learn 5 more notes!</div>
              <button id="lessonTwoButtonOne" className="btn btn-primary"onClick={()=>this.lessonTwoButtonOne()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageTwo"> We'll look at middle C. However, this time, middle C is in the bass Clef. For now, assume that whatever is played in the bass clef is played in the left hand. Look at the image to determine where middle C is located on your piano. <br/> <img style={{height:"50vh", width: "60vw"}}src={require("../static/findMiddleC.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonTwo" className="btn btn-primary" onClick={()=>this.lessonTwoButtonTwo()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageThree"> When you find it, play Middle C with your left hand <br/><img style={{height:"12em", width: "15em"}}src={require("../static/leftHandPianoHome1.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonThree" className="btn btn-primary" onClick={()=>this.lessonTwoButtonThree()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageFour"> Excellent! Let's move on to the next note! The white key to the left of C is B.  <br/> <img style={{height:"50vh", width: "60vw"}}src={require("../static/findB.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonFour" className="btn btn-primary" onClick={()=>this.lessonTwoButtonFour()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageFive"> Please play B! <br/> <img style={{height:"50vh", width: "60vw"}}src={require("../static/findB.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonFive" className="btn btn-primary" onClick={()=>this.lessonTwoButtonFive()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageSix"> Good Work! After B, the next white key to the left is an A <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findA.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonSix" className="btn btn-primary" onClick={()=>this.lessonTwoButtonSix()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageSeven"> Please play A!<br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findA.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonSeven" className="btn btn-primary" onClick={()=>this.lessonTwoButtonSeven()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageEight"> Super! The next note to the left is F! <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findG.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonEight" className="btn btn-primary" onClick={()=>this.lessonTwoButtonEight()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageNine"> Please play G! <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findG.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonNine" className="btn btn-primary" onClick={()=>this.lessonTwoButtonNine()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageTen"> Great! The last note for this lesson is F. Please find F. <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findF.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonTen" className="btn btn-primary" onClick={()=>this.lessonTwoButtonTen()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageEleven"> Play F! <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/findF.jpg")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonEleven" className="btn btn-primary" onClick={()=>this.lessonTwoButtonEleven()}> next </button>
              <div style={{fontFamily: "helvetica", fontSize: "1.5em", display: "none"}} id="lessonTwoMessageTwelve"> Congrats! You have learned how to play your first five notes with your left hand. Please continue to lesson three! <br/> <img style={{height:"50vh", width: "60vw"}} src={require("../static/goodJob.gif")}/><br/></div>
              <button style={{display: "none", margin: "auto", marginTop: "1em"}} id="lessonTwoButtonTwelve" className="btn btn-primary" onClick={()=>this.lessonTwoButtonTwelve()}> Finish </button>
              <Popup/>
            </div>
          </div>
        </div>
      </div>
     
    )
  }
}
const LessonTwoMapStateToProps = (store) => {
  return {
    Auth: store.Auth,
    LessonsCompleted: store.LessonsCompleted
  }
}

const LessonTwoDispatch = (dispatch) => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch),
    LessonsCompleted: bindActionCreators(LessonsCompleted, dispatch)
  }
}

export default connect(LessonTwoMapStateToProps, LessonTwoDispatch)(LessonTwo)
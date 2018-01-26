import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { app } from '../firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'
import Popup from 'react-popup'
import pitchTable from "../helpers/pitchTable"



class LessonOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      hideStart: "visible"
    }
    this.popUpCount = 1
    this.findPitch = this.findPitch.bind(this)
    this.arr = []
  }

  componentDidMount(){

  }

  componentWillUnmount(){
  }

  findPitch(){
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
        }
        else {
            reportError('AudioContext is not supported in this browser');
        }
    };

    var updatePitch = function (pitch) {
        //$('#pitch').text(pitch + ' Hz');
    };

    var updateNote = function (note) {
      if (note !== "--" && note!== "F8"){
        that.arr.push(note)
        console.log(that.arr, 'arrrr')
      }
    };

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
                // Let's assume that this is good enough and stop right here
                break;
            }
        }

        if (bestR > 0.0025) {
            // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
            var fundamentalFreq = sampleRate / bestK;
            return fundamentalFreq;
        }
        else {
            // We haven't found a good correlation
            return -1;
        }
    };

    var findClosestNote = function (freq, notes) {
        // Use binary search to find the closest note
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
            // notes[high] is closer to the frequency we found
            return notes[high];
        }

        return notes[low];
    };

    var findCentsOffPitch = function (freq, refFreq) {
        // We need to find how far freq is from baseFreq in cents
        var log2 = 0.6931471805599453; // Math.log(2)
        var multiplicativeFactor = freq / refFreq;

        // We use Math.floor to get the integer part and ignore decimals
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
        $('#referenceOptions').toggle(false);
        isRefSoundPlaying = false;
    };

    var turnOffMicrophone = function () {
        if (sourceAudioNode && sourceAudioNode.mediaStream && sourceAudioNode.mediaStream.stop) {
            sourceAudioNode.mediaStream.stop();
        }
        sourceAudioNode = null;
        updatePitch('--');
        updateNote('--');
        updateCents(-50);
        $('#microphoneOptions').toggle(false);
        analyserAudioNode = null;
        window.cancelAnimationFrame(frameId);
        isMicrophoneInUse = false;
    };

    var toggleMicrophone = function () {
        if (isRefSoundPlaying) {
            turnOffReferenceSound();
        }

        if (!isMicrophoneInUse) {
            //$('#microphoneOptions').toggle(true);

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
            turnOffMicrophone();
        }
    };

    var toggleReferenceSound = function () {
        if (isMicrophoneInUse) {
            toggleMicrophone();
        }

        if (!isRefSoundPlaying) {
            $('#referenceOptions').toggle(true);
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
                // Only change the frequency if we are playing a reference sound, since
                // sourceAudioNode will be an instance of OscillatorNode
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
                // In this case we haven't changed the base frequency, so we just need to update the note on screen
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
    toggleMicrophone()

  }

  handleClick(){
    let deleteStart = function (){
        document.getElementById("startButton").style.visibility = "hidden"
    }

    const pops = () =>{
      let poop = "shit"
      let cardOne = Popup.create({
      title: 'Lesson 1 - 1',
      content: <a style={{fontSize:"20px"}}>Welcome to your first lesson! Today we will learn how to play 5 notes!</a>,
      buttons: {
          right: [{
              text: 'Next',
              className: 'danger',
              action:  () => {
                  Popup.close()  
              }
          }]
        }
      });

      let cardTwo = Popup.create({
      title: 'Lesson 1 - 2',
      content: <a style={{fontSize:"20px"}}>The first note we'll learn is C. Click Next When you find middle C <img style={{height:"8em", width: "10em"}}src={require("../static/200w_d.gif")}/></a>,
      buttons: {
          right: [{
              text: 'Next',
              className: 'danger',
              action: () => {
                  //Popup.close() 
                  this.findPitch()
                  console.log(this.arr, 'arr answer') 
              }
          }]
        }
      });
      let cardThree = Popup.create({
      title: 'Lesson 1 - 3',
      content: <a style={{fontSize:"20px"}}>Play the C!</a>,
      buttons: {
          left:[{
              text: 'Close',
              className: 'danger',
              action:  () => {
                  Popup.clearQueue()
                  Popup.close()
              }
          }],
          right: [{
              text: 'Next',
              className: 'danger',
              action:  () => {
                  Popup.clearQueue()
                  Popup.close()  
              }
          }]
        }
      });
      Popup.queue(cardOne, cardTwo)
    }

    if (this.popUpCount === 1){
      pops()
      this.popUpCount+=1
    }

}
  

  render() {
    

    console.log(this.props, 'lessonOne')

    if (!this.props.profile.online){
      return <Redirect to="/"/>
    }
    return (
      <div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
        <div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1}}>
          <div className="row" style={{height: "8em"}}>
          </div>
          <div className="row">
            <div className="col-md-12"> 
              <div className="wow slideInRight" data-wow-offset="10"> Lesson One</div>
            </div>
            <div className="col-md-4"> </div>
          </div>
          <div className="row">
            <div className="col-md-4">
            <div style={{}} id="startButton" className="wow slideInRight" data-wow-offset="10" onClick={()=> {this.handleClick()}}> <Popup closeBtn={true}/> start </div>
            </div>
          </div>
        </div>
      </div>
     
    )
  }
}


const LessonOneMapStateToProps = (store) => {
  return {
    profile: store.Auth
  }
}

const LessonOneDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(LessonOneMapStateToProps, LessonOneDispatch)(LessonOne)
import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { app } from '../firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'
import Popup from 'react-popup';



class LessonOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      hideStart: "visible"
    }
    this.popUpCount = 1
  }

  componentDidMount(){

  }

  componentWillUnmount(){
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
              action:  () => {
                  poop = "good"
                  console.log('put listener here', poop)
                  Popup.close()  
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
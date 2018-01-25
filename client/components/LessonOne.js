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
      loading: true
    }
    this.popUpCount = 1
  }

  componentDidMount(){

  }

  componentWillUnmount(){
  }

  handleClick(){
    if (this.popUpCount === 1){

      this.popUpCount+=1
    let mySpecialPopup = Popup.create({
    title: 'Lesson 1',
    content: <a style={{fontSize:"20px"}}>Welcome to your first lesson! Today we will learn how to play 5 notes!</a>,
    buttons: {
        left:[{
            text: 'Cancel',
            className: 'danger',
            action:  () => {
                /** Close this popup. Close will always close the current visible one, if one is visible */
                console.log(mySpecialPopup, 'popup')
                Popup.clearQueue()
                Popup.close()

            }
        }],
        right: [{
            text: 'Ok',
            className: 'danger',
            action:  () => {

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.clearQueue()
                Popup.close()
                
            }
        }]
    }

});

      Popup.queue(mySpecialPopup);
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
            <div className="col-md-4"> 
              <div className="wow slideInRight" data-wow-offset="10"> Lesson One</div>
            </div>
            <div className="col-md-4" onClick={()=> {this.handleClick()}}> <Popup closeBtn={true}/></div>
          </div>
          <div className="row">
            <div className="col-md-4">
            <img style={{height:"200px"}} className="wow slideInRight" data-wow-offset="10" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png"/>
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
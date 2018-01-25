import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { app } from '../firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'



class LessonOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
   
  }

  componentDidMount(){
  }

  componentWillUnmount(){
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
            <div className="col-md-4"></div>
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
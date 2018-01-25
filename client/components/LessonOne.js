import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
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

  componentWillMount(){

  }

  componentWillUnmount(){
  }
  

  render() {
    console.log(this.props, 'lessonOne')
    return (
      <div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
        <div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1}}>
          <div className="row" style={{height: "8em"}}>
          </div>
          <div className="row">
            <div className="col-md-4"> 
              Lesson One
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4">
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
import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { app, firebaseDB } from '../firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions'
import * as LessonsCompletedActions from '../actions/lessonsCompletedActions'
import * as MiniGamesCompletedActions from '../actions/miniGamesCompletedActions'

import NavBar from './NavBar'
import DefaultHome from './DefaultHome'
import Footer from './Footer'
import Profile from'./Profile'
import LessonOne from './LessonOne'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userID: ""
    }
  }

  componentWillMount(){
    let that = this
    this.removeAuthListener = app.auth().onAuthStateChanged(user=>{
      if (user){
        that.setState({
          userID: user.uid
        })
        let userLessonStatus = firebaseDB.ref("/users/" + user.uid + "/lessonsCompleted")
        let userMiniGameStatus = firebaseDB.ref("/users/" + user.uid + "/miniGamesCompleted")
        let lessons = {
          lesson1: {completed: false, time: null},
          lesson2: {completed: false, time: null},
          lesson3: {completed: false, time: null},
          lesson4: {completed: false, time: null},
          lesson5: {completed: false, time: null}
        } 
        let miniGames = {
          miniGame1: {completed: false, highScore: null},
          miniGame2: {completed: false, highScore: null},
          miniGame3: {completed: false, highScore: null},
          miniGame4: {completed: false, highScore: null},
          miniGame5: {completed: false, highScore: null}
        }

        userLessonStatus.once("value")
        .then(snapshot => {
          if (!snapshot.val()){
            userLessonStatus.update(lessons)
          } else {
            that.props.LessonsCompletedActions.lessonsCompleted(snapshot.val())
          }
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        })

        userMiniGameStatus.once("value")
        .then(snapshot => {
          if (!snapshot.val()){
            userMiniGameStatus.update(miniGames)
          } else {
            that.props.MiniGamesCompletedActions.miniGamesCompleted(snapshot.val())
          }
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        })


        let userInfo = {
          name : user.displayName,
          email : user.email,
          userId : user.uid,
          picture : user.photoURL
        }
        this.props.AuthActions.userLoginInfo(userInfo)
        this.setState({loading:false})
      } else {
        console.log('fail')
        this.setState({authenticated: false})
      }
    })
  }

  componentWillUnmount(){
    this.removeAuthListener()
  }
  

  render() {
    return (
      <BrowserRouter>
        <div className="main" style={{display: 'flex'}}>  
          <NavBar authenticated = {this.props.online}/>
          <div style={{flexDirection: "row", flex:1}}>
            <Switch>
              <Route exact path='/' component={() => ( <DefaultHome authenticated={this.props.online} />)}/>
              <Route exact path='/Profile' component={() => ( <Profile authenticated={this.props.online} loading={this.state.loading} userID={this.state.userID}/>)}/>
              <Route exact path='/LessonOne' component={() => ( <LessonOne />)}/>
              <Route render={() => {
                return (
                  <div className="row" style={{backgroundColor: 'lightpink', height: '100vh', minWidth: '100vw', flex:1}}>
                    <div className="col align-self-center">
                      <div style={{textAlign: 'center'}}>
                        <h1>Error 404 Page Not Found</h1>
                      </div>
                    </div>
                  </div>
                  )}}
              />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const appMapStateToProps = (store) => {
  return {
    online: store.Auth.online
  }
}

const appDispatch = (dispatch) => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch),
    LessonsCompletedActions: bindActionCreators(LessonsCompletedActions, dispatch),
    MiniGamesCompletedActions: bindActionCreators(MiniGamesCompletedActions, dispatch)
  }
}

export default connect(appMapStateToProps, appDispatch)(App)
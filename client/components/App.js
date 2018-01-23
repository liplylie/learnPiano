import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { app } from '../firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'


import NavBar from './NavBar'
import DefaultHome from './DefaultHome'
import Footer from './Footer'
import Profile from'./Profile'
import LessonOne from './LessonOne'
import NavBar from './NavBar'
import DefaultHome from './DefaultHome'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
   
  }

  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged(user=>{
      if (user){
        console.log(user, 'true')
        let userInfo = {
          name : user.displayName,
          email : user.email,
          userId : user.uid,
          picture : user.photoURL
        }
        this.props.actions.userLoginInfo(userInfo)
        console.log(this.props.online,' status')
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
              <Route exact path='/Profile' component={() => ( <Profile authenticated={this.props.online} loading={this.state.loading}/>)}/>
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
}
const appMapStateToProps = (store) => {
  return {
    online: store.Auth.online
  }
}

const appDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(appMapStateToProps, appDispatch)(App)

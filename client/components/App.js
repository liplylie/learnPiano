import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import NavBar from './NavBar'
import DefaultHome from './DefaultHome'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false
    }
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
  }

  authWithEmailPassword() {
    const email = document.getElementById('emailInput').value
    const pw = document.getElementById('passwordInput').value
    const authDomain = firebase.auth()

    auth.signInWithEmailAndPassword(email, pw)
      .then(result => {
        console.log('logged in')

          this.setState({
            authenticated: true,
          })
        })
      .catch(err => console.log('error with login', err))
    document.getElementById('emailInput').value = ''
    document.getElementById('passwordInput').value = ''
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main">  
          <NavBar authenticated = {this.state.authenticated} login ={this.authWithEmailPassword}/>
          <div style={{display: 'flex'}}>
            <Switch>
              <Route exact path='/' component={() => ( <DefaultHome />)}/>
              <Route render={() => {
                return (
                  <div className='fourofour-section'>
                    <p className='fourofour-status'>404</p>
                    <p className='fourofour-description'>PAGE NOT FOUND!</p>
                  </div>
                  )
              }} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { app } from '../firebase'


import NavBar from './NavBar'
import DefaultHome from './DefaultHome'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false
    }
   
  }

  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged(user=>{
      if (user){
        console.log(user, 'true')
        this.setState({authenticated: true})
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
        <div className="main">  
          <NavBar authenticated = {this.state.authenticated}/>
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
import React, { Component } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import NavBar from './NavBar'
import DefaultHome from './DefaultHome'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <NavBar />
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
import React, { Component } from 'react'
import { Toaster, Intent } from '@blueprintjs/core' 
import { firebase, app, facebookProvider } from '../firebase'

class LogIn extends Component {
	constructor(){
		super()
		this.authWithFacebook = this.authWithFacebook.bind(this)
		this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
	}

	authWithFacebook(){
		app.auth().signInWithPopup(facebookProvider)
		.then((result,error)=>{
			if (error){
				alert(error.message)
			} 
		})
		.catch(err => {
			alert(error.message)
		})
	}

	authWithEmailPassword(event) {
		console.log(event, 'here')
		event.preventDefault()
    const email = document.getElementById('emailInput').value
    const pw = document.getElementById('passwordInput').value

    app.auth().fetchProvidersForEmail(email)
    .then(providers => {
    	if (providers.length === 0){
    		return app.auth().createUserWithEmailAndPassword(email, pw)
    	} else {
    		app.auth().signInWithEmailAndPassword(email, pw)
      .then(result => {
        console.log('logged in')
       })
      .catch(err => {
      	console.log('error with login', err)
      	alert(err.message)
      })
    	}
    })
    document.getElementById('emailInput').value = ''
    document.getElementById('passwordInput').value = ''
  }

	render(){
		return(
			<div>
				<button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn dropbtn btn-outline-secondary dropdown-toggle">Login <span className="caret"></span></button>
				<ul style={{padding:"2em 4em 0px 4em"}} className="dropdown-menu dropdown-menu-right dropdown-content mt-1">
	        <li className="p-3">
	              <form className="form" role="form">
	                  <div className="form-group">
	                      <input id="emailInput" placeholder="Email" className="input-large" type="email" required=""/>
	                  </div>
	                  <div className="form-group">
	                      <input id="passwordInput" placeholder="Password" className="input-large" type="password" required="" />
	                  </div>
	                  <div className="form-group">
	                      <button className="btn btn-primary btn-block" style={{cursor:"pointer"}} onClick={(event)=>{event.preventDefault; this.authWithEmailPassword(event) }}>Login/SignUp</button>
	                  </div>
	                  <div className="form-group text-xs-center">
	                      <small><a >Forgot password?</a></small>
	                  </div>

	                  <div className="container">
									    <a className="btn btn-lg btn-social btn-facebook" style={{background: "#3B5998",
    color: "white", cursor: "pointer"}} onClick={()=>{this.authWithFacebook()}}>
									    <i className="fa fa-facebook fa-fw"></i> Sign in with Facebook
									    </a>
									</div>
	              </form>
	          </li>
	      </ul>
	  	</div>
	  )
	}
}

export default LogIn
import React, { Component } from 'react'
<<<<<<< HEAD
import { Toaster, Intent } from '@blueprintjs/core' 
import { firebase, app, facebookProvider } from '../firebase'
=======
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP

class LogIn extends Component {
	constructor(){
		super()
<<<<<<< HEAD
		this.state = {
			redirect: false
		}
		this.authWithFacebook = this.authWithFacebook.bind(this)
		this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
	}

	authWithFacebook(){
		console.log('authF')
		app.auth().signInWithPopup(facebookProvider)
		.then((result,error)=>{
			if (error){
				this.toaster.show({intent: Intent.DANGER, message: "Unable to sign in with Facebook"})
			} else {
				this.setState({redirect:true}) 
			}
		})
		.catch(err => {
			this.toaster.show({intent: Intent.DANGER, message: "Unable to sign in with Facebook"})
		})
	}

	authWithEmailPassword() {
    const email = document.getElementById('emailInput').value
    const pw = document.getElementById('passwordInput').value
    const authDomain = firebase.auth()

    app.auth().signInWithEmailAndPassword(email, pw)
      .then(result => {
        console.log('logged in')
        })
      .catch(err => console.log('error with login', err))
    document.getElementById('emailInput').value = ''
    document.getElementById('passwordInput').value = ''
  }
=======
	}

>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP

	render(){
		return(
			<div>
<<<<<<< HEAD
				<Toaster ref={(element => {this.toaster = element})}/>
=======
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP
				<button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle">Login <span className="caret"></span></button>
				<ul style={{padding:"2em 4em 0px 4em"}} className="dropdown-menu dropdown-menu-right mt-1">
	        <li className="p-3">
	              <form className="form" role="form">
	                  <div className="form-group">
	                      <input id="emailInput" placeholder="Email" className="input-large" type="text" required=""/>
	                  </div>
	                  <div className="form-group">
	                      <input id="passwordInput" placeholder="Password" className="input-large" type="text" required=""/>
	                  </div>
	                  <div className="form-group">
<<<<<<< HEAD
	                      <button type="submit" className="btn btn-primary btn-block" style={{cursor:"pointer"}}>Login</button>
=======
	                      <button type="submit" className="btn btn-primary btn-block" >Login</button>
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP
	                  </div>
	                  <div className="form-group text-xs-center">
	                      <small><a href="#">Forgot password?</a></small>
	                  </div>
<<<<<<< HEAD

	                  <div className="container">
									    <a className="btn btn-lg btn-social btn-facebook" style={{background: "#3B5998",
    color: "white", cursor: "pointer"}} onClick={()=>{this.authWithFacebook()}}>
									    <i className="fa fa-facebook fa-fw"></i> Sign in with Facebook
									    </a>
									</div>
=======
	                  <div className="fb-login-button"></div>
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP
	              </form>
	          </li>
	      </ul>
	  	</div>
	  )
	}
}

export default LogIn
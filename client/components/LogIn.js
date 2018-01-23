import React, { Component } from 'react'

class LogIn extends Component {
	constructor(){
		super()
	}


	render(){
		return(
			<div>
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
	                      <button type="submit" className="btn btn-primary btn-block" >Login</button>
	                  </div>
	                  <div className="form-group text-xs-center">
	                      <small><a href="#">Forgot password?</a></small>
	                  </div>
	                  <div className="fb-login-button"></div>
	              </form>
	          </li>
	      </ul>
	  	</div>
	  )
	}
}

export default LogIn
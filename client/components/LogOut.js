import React, { Component } from 'react'
import { app } from '../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'

class LogOut extends Component {
	constructor(){
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		app.auth().signOut()
		.then(user=>{
			this.props.actions.logOutAction(false)
		})
	}

	render(){
		return(
			<div>
				<button type="button" id="signOut" onClick={()=>this.handleClick()}className="btn btn-outline-secondary">Log Out<span className="caret"></span></button>
			</div>
			)
	}
}

const LogOutMapStateToProps = (store) => {
  return {
    online: store.Auth.online
  }
}

const LogOutDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}


export default connect(LogOutMapStateToProps, LogOutDispatch)(LogOut)
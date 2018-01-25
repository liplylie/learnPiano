import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'

class Profile extends Component{
	constructor(props){
		super(props)
	}

	render(){
		console.log(this.props, 'profile props')
		if (this.props.loading ){
			return (
				<div style={{height:"100vh", padding: "10em"}}>
	        <div className="loader">
	        </div>
        </div>
      );
		}

		if (!this.props.online) {
			return <Redirect to='/'/>
		}
		return (
			<div style={{height:"100vh", width:"100vw", textAlign: "center",  paddingTop: '4em'}}>
				Profile
		</div>
		)
	}
}

const ProfileMapStateToProps = (store)=>{
	return{
		online:store.Auth.online
	}
}

const ProfileDispatch = (dispatch)=>{
	return{
		actions: bindActionCreators(AuthActions, dispatch)
	}
}


export default connect(ProfileMapStateToProps, ProfileDispatch)(Profile)
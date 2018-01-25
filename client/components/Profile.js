import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'

class Profile extends Component{
	constructor(props){
		super(props)
	}

	render(){
		console.log(this.props, 'profile props')
		if (this.props.loading && this.props.online){
			return (
				<div style={{height:"100vh", padding: "10em"}}>
	        <div className="loader">
	        </div>
        </div>
      );
		}

		if (!this.props.profile.online) {
			return <Redirect to='/'/>
		}
		return (
			<div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
				<div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1}}>
					<div className="row" style={{height: "8em"}}>
					</div>
					<div className="row">
						<div className="col-md-4"> 
							<img className="span3 wow flipInX center"src={this.props.profile.picture} style={{height: "10em", width:"10em", visibility: "visible", animationName: "flipInX"}}/>
						</div>
						<div className="col-md-4"></div>
						<div className="col-md-4"> <Link to="/lessonOne">lesson one</Link></div>
					</div>
					<div className="row">
						<div className="col-md-4">
						{this.props.profile.name}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const ProfileMapStateToProps = (store)=>{
	return{
		profile:store.Auth
	}
}

const ProfileDispatch = (dispatch)=>{
	return{
		actions: bindActionCreators(AuthActions, dispatch)
	}
}


export default connect(ProfileMapStateToProps, ProfileDispatch)(Profile)
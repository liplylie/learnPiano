import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { app, firebaseDB } from '../firebase'

import * as AuthActions from '../actions/authActions'



class ProfileSettings extends Component {
	constructor(){
		super()

	}

	changeName(){
		let userSettings = firebaseDB.ref("/users/" + this.props.profile.userId + "/userSettings")
		userSettings.once("value")
        .then(snapshot => {
        	console.log('change Name', snapshot.val())
            //that.props.AuthActions.userLoginInfo(snapshot.val())
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        })
	}

	changePicture(){

	}

	render(){
		return (
     <div style={{height:"100vh", width:"100vw", textAlign: "center", overflowY: "scroll"}}>
				<div style={{width:"80vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1, overflowX: "scroll"}}>
					<div className="row" style={{height: "7em"}}></div>
					<div className="col-md-12"> 
						<h1>Profile Settings</h1> 
					</div>
					<div className="row" style={{height: "7em", margin: "auto", padding: "1em"}}>	
						<div style={{fontSize: "1.5em"}}>
							Name: {this.props.profile.name ? this.props.profile.name : "Not Set"}
							<br/>
							<button className="btn btn-primary" onClick={()=>{this.changeName()}}>Change Name </button>
						</div>
					</div>
					<div className="row" style={{margin: "auto", padding: "1em"}}>	
						<div style={{fontSize: "1.5em"}}>
							Picture: <img src={this.props.profile.picture ? this.props.profile.picture : require("../static/defaultUser.png")} style={{height: "10em", width: "10em", padding: "1em"}}/>
						</div>
					</div>
					<div className="row" style={{margin: "auto", padding: "1em"}}>	 
						<div style={{fontSize: "1.5em"}}>
							Email: {this.props.profile.email}
						</div>
					</div>

					</div>
			</div>
    )
	}
}


const profileSettingsMapStateToProps = (store) => {
  return {
    profile: store.Auth
  }
}

const profileSettingsDispatch = (dispatch) => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch),
    }
}

export default connect(profileSettingsMapStateToProps, profileSettingsDispatch)(ProfileSettings)
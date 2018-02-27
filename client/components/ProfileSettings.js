import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { app, firebaseDB } from '../firebase'

import * as AuthActions from '../actions/authActions'



class ProfileSettings extends Component {
	constructor(){
		super()

	}

	changeName(event){
		event.preventDefault()
		let newName = document.getElementById("newName").value
		let userInfo = {
          name : newName,
          email : this.props.profile.email,
          userId : this.props.profile.userId,
          picture : this.props.profile.picture
        }
		console.log(newName)
		let userSettings = firebaseDB.ref("/users/" + this.props.profile.userId + "/userSettings")
		userSettings.once("value")
        .then(snapshot => {
        	console.log('change Name', snapshot.val())
        	userSettings.update(userInfo)
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        })
   this.props.AuthActions.userLoginInfo(userInfo)

	}

	showChangeName(){
		document.getElementById("showChangeName").style.display = "block"
	}

	changePicture(){

	}

	render(){
		return (
     <div style={{height:"100vh", width:"100vw", textAlign: "center", overflowY: "scroll"}}>
				<div style={{width:"80vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1, overflowX: "scroll"}}>
					<div className="row" margin = "1em"></div>
					<div className="col-md-12"> 
						<h1>Profile Settings</h1> 
					</div>
					<div className="row" style={{margin: "auto", padding: "1em"}}>	
						<div style={{fontSize: "1.5em"}}>
							Name: {this.props.profile.name ? this.props.profile.name : "Not Set"}
							<div id="showChangeName" style={{display:"none"}}>
								<form onSubmit={(event)=>{event.preventDefault; this.changeName(event)}} >
									<input id="newName" type="name" placeholder="Enter new name" />
									<input type="submit" className="btn-info" placeholder="submit"/>
								</form>
							</div>
							<br/>
							<button className="btn btn-primary" onClick={()=>{this.showChangeName()}}>Change Name </button>
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
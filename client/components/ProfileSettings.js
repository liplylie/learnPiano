import React, { Component } from 'react'
import { Redirect } from 'react-router'
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
        	userSettings.update(userInfo)
        }, (errorObject) => {
          alert("The read failed: " + errorObject.code);
        })
   this.props.AuthActions.userLoginInfo(userInfo)

	}

	showChangeName(){
		document.getElementById("showChangeName").style.display = "block"
		document.getElementById("changeName").style.display = "none"
	}

	showChangePicture(){
		document.getElementById("showChangePicture").style.display = "block"
		document.getElementById("changePicture").style.display = "none"

	}

	changePicture(){
		document.getElementByIds("show")
	}

	render(){
		// if (!this.props.authenticated) {
		// 		return <Redirect to="/"/>
		// 	}
		return (
     <div style={{height:"100vh", width:"100vw", overflowY: "scroll"}}>
				<div style={{width:"80vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1, overflowX: "scroll"}}>
					<div className="row" margin = "1em"></div>
					<div className="col-md-12"> 
						<h1>Profile Settings</h1> 
					</div>
					<div className="row" style={{margin: "auto", padding: "1em"}}>	
						<div className="col-md-12"> 
							<table id="settingTable" className="table table-hover" style={{border:"none"}}>
								<tbody>
									<tr style={{border:"none"}}onClick={()=>{this.showChangeName()}} >
										<th style={{border:"none"}}>Name</th>
										<td style={{color: "grey", border:"none"}}>{this.props.profile.name ? this.props.profile.name : "Not Set"}</td>
										<td id="changeName" style={{border:"none"}}><span style={{color: "#365899", textAlign: "center"}} > Edit </span></td>
										<td id="showChangeName" style={{display:"none", border:"none"}}>
											<form onSubmit={(event)=>{event.preventDefault; this.changeName(event)}} >
												<input id="newName" type="name" placeholder="Enter new name" />
												<input type="submit" className="btn-info" placeholder="submit"/>
											</form>
										</td>
									</tr>
									<tr style={{border:"none"}}>
										<th style={{border:"none"}}>Email</th>
										<td style={{border:"none", color: "grey"}}>{this.props.profile.email}</td>
										<td style={{border:"none"}}></td>
									</tr>
									<tr onClick={()=>{this.showChangePicture()}} style={{border:"none"}}>
										<th style={{border:"none"}}>Picture</th>
										<td style={{border:"none"}}> 
											<img src={this.props.profile.picture ? this.props.profile.picture : require("../static/defaultUser.png")} style={{height: "10em", width: "10em"}}/>
										</td>
										<td id="changePicture" style={{border:"none"}} ><span style={{color: "#365899", textAlign: "center"}} > Edit </span></td>
										<td id="showChangePicture" style={{display:"none", border:"none", width: "20em"}}>
											<label className="custom-file">
											  <input type="file" id="file" className="custom-file-input"/>
											  <span className="custom-file-control"></span>
										</label>
										</td>
									</tr>
								</tbody>
							</table>
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
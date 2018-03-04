import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { app, firebaseDB } from '../firebase'
import AWS from 'aws-sdk'
import secret from '../../secret.json'
import $ from 'jquery'

import * as AuthActions from '../actions/authActions'
import * as LessonsCompletedActions from '../actions/lessonsCompletedActions'
import * as MiniGamesCompletedActions from '../actions/miniGamesCompletedActions'

class ProfileSettings extends Component {
	constructor(){
		super()
		this.count = 0
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
		console.log(document.getElementById('file').value)
	}

	showChangePicture(){
		let that = this

		document.getElementById("showChangePicture").style.display = "block"
		document.getElementById("changePicture").style.display = "none"
		$("#photoupload").change(function(){
			$("#upload-file-info").html(this.files[0].name)
			that.count +=1
			console.log('photoupload')
			if (that.count <=1){
      	that.addPhoto()
			}
 		});
	}


	addPhoto() {
		let that = this
		let s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: secret.BucketName}
    });
	  let files = document.getElementById('photoupload').files;
	  if (!files.length) {
	    return alert('Please choose a file to upload first.');
	  }
	  let file = files[0];
	  let fileName = file.name;
	  let albumPhotosKey = encodeURIComponent("pictures") + '/' + this.props.profile.userId + '/';
	  let photoKey = albumPhotosKey + fileName;
	  s3.upload({
	    Key: photoKey,
	    Body: file,
	    ACL: 'public-read'
	  }, (err, data) => {
	    if (err) {
	    	console.log(err)
	      return alert('There was an error uploading your photo: ', err.message);
	    }
	    let userInfo = {
          name : this.props.profile.name,
          email : this.props.profile.email,
          userId : this.props.profile.userId,
          picture : data.Location
        }
    that.props.AuthActions.userLoginInfo(userInfo)
		let userSettings = firebaseDB.ref("/users/" + this.props.profile.userId + "/userSettings")
		userSettings.once("value")
        .then(snapshot => {
        	userSettings.update(userInfo)
        }, (errorObject) => {
          alert("The read failed: " + errorObject.code);
        })
	    console.log(data)

	  });
	}

	resetSettings(){
		let that = this
		let userLessonStatus = firebaseDB.ref(
          "/users/" + user.uid + "/lessonsCompleted"
        );
        let userMiniGameStatus = firebaseDB.ref(
          "/users/" + user.uid + "/miniGamesCompleted"
        );
         let lessons = {
          lesson1: { completed: false, time: null },
          lesson2: { completed: false, time: null },
          lesson3: { completed: false, time: null },
          lesson4: { completed: false, time: null },
          lesson5: { completed: false, time: null }
        };
        let miniGames = {
          miniGame1: { completed: false, highScore: null },
          miniGame2: { completed: false, highScore: null },
          miniGame3: { completed: false, highScore: null },
          miniGame4: { completed: false, highScore: null },
          miniGame5: { completed: false, highScore: null }
        };

         userLessonStatus.once("value").then(
          snapshot => {
          	userLessonStatus.update(lessons)
              that.props.LessonsCompletedActions.lessonsCompleted(
                lessons
              );
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );

        userMiniGameStatus.once("value").then(
          snapshot => {
            if (!snapshot.val()) {
              userMiniGameStatus.update(miniGames);
            } else {
              that.props.MiniGamesCompletedActions.miniGamesCompleted(
                snapshot.val()
              );
            }
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );
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
											  <input type="file" id="photoupload" accept=".jpg, .jpeg, .png, .gif, .pdf" className="custom-file-input"/>
											  <span className="custom-file-control" id="upload-file-info"></span>
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
    LessonsCompletedActions: bindActionCreators(LessonsCompletedActions, dispatch),
    MiniGamesCompletedActions: bindActionCreators(MiniGamesCompletedActions, dispatch)
    }
}

export default connect(profileSettingsMapStateToProps, profileSettingsDispatch)(ProfileSettings)
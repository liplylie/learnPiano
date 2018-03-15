import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { app, firebaseDB } from "../firebase";
import AWS from "aws-sdk";
import secret from "../../secret.json";
import Popup from "react-popup";
import $ from "jquery";

import * as AuthActions from "../actions/authActions";
import * as LessonsCompletedActions from "../actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "../actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "../actions/introSongsCompletedActions";

import introSongsList from "../helpers/introSongs"

class ProfileSettings extends Component {
	constructor() {
		super();
		this.count = 0;
		this.resetLessonsSettings = this.resetLessonsSettings.bind(this);
		this.resetMiniGameSettings = this.resetMiniGameSettings.bind(this);
	}

	changeName(event) {
		event.preventDefault();
		let newName = document.getElementById("newName").value;
		let userInfo = {
			name: newName,
			email: this.props.profile.email,
			userId: this.props.profile.userId,
			picture: this.props.profile.picture
		};
		let userSettings = firebaseDB.ref(
			"/users/" + this.props.profile.userId + "/userSettings"
		);
		userSettings.once("value").then(
			snapshot => {
				userSettings.update(userInfo);
			},
			errorObject => {
				alert("The read failed: " + errorObject.code);
			}
		);
		this.props.AuthActions.userLoginInfo(userInfo);
	}

	showChangeName() {
		document.getElementById("showChangeName").style.display = "block";
		document.getElementById("changeName").style.display = "none";
	}

	showChangePicture() {
		let that = this;

		document.getElementById("showChangePicture").style.display = "block";
		document.getElementById("changePicture").style.display = "none";
		$("#photoupload").change(function() {
			$("#upload-file-info").html(this.files[0].name);
			that.count += 1;
			if (that.count <= 1) {
				that.addPhoto();
			}
		});
	}

	addPhoto() {
		let that = this;
		let s3 = new AWS.S3({
			apiVersion: "2006-03-01",
			params: { Bucket: secret.BucketName }
		});
		let files = document.getElementById("photoupload").files;
		if (!files.length) {
			return alert("Please choose a file to upload first.");
		}
		let file = files[0];
		let fileName = file.name;
		let albumPhotosKey =
			encodeURIComponent("pictures") + "/" + this.props.profile.userId + "/";
		let photoKey = albumPhotosKey + fileName;
		s3.upload(
			{
				Key: photoKey,
				Body: file,
				ACL: "public-read"
			},
			(err, data) => {
				if (err) {
					return alert(
						"There was an error uploading your photo: ",
						err.message
					);
				}
				let userInfo = {
					name: this.props.profile.name,
					email: this.props.profile.email,
					userId: this.props.profile.userId,
					picture: data.Location
				};
				that.props.AuthActions.userLoginInfo(userInfo);
				let userSettings = firebaseDB.ref(
					"/users/" + this.props.profile.userId + "/userSettings"
				);
				userSettings.once("value").then(
					snapshot => {
						userSettings.update(userInfo);
					},
					errorObject => {
						alert("The read failed: " + errorObject.code);
					}
				);
			}
		);
	}

	resetLessonsSettings() {
		let that = this;
		let userLessonStatus = firebaseDB.ref(
			"/users/" + this.props.profile.userId + "/lessonsCompleted"
		);
		let lessons = {
			lesson1: { completed: false, time: null },
			lesson2: { completed: false, time: null },
			lesson3: { completed: false, time: null },
			lesson4: { completed: false, time: null },
			lesson5: { completed: false, time: null }
		};

		userLessonStatus.once("value").then(
			snapshot => {
				userLessonStatus.update(lessons);
				that.props.LessonsCompletedActions.lessonsCompleted(lessons);
			},
			errorObject => {
				console.log("The read failed: " + errorObject.code);
			}
		);
	}

	resetIntroSongsSettings() {
		let that = this;
		let introSongsStatus = firebaseDB.ref(
      "/users/" + this.props.profile.userId + "/introSongsCompleted"
    );
		let introSongs = introSongsList
		introSongsStatus
			.once("value")
			.then(
				snapshot => {
				introSongsStatus.update(introSongs);
				that.props.IntroSongsCompletedActions.introSongsCompleted(introSongs);
			},
			errorObject => {
				console.log("The read failed: " + errorObject.code);
			}
		);
	}

	resetMiniGameSettings() {
		let that = this;
		let userMiniGameStatus = firebaseDB.ref(
			"/users/" + this.props.profile.userId + "/miniGamesCompleted"
		);
		let miniGames = {
			miniGame1: { completed: false, highScore: null },
			miniGame2: { completed: false, highScore: null },
			miniGame3: { completed: false, highScore: null },
			miniGame4: { completed: false, highScore: null },
			miniGame5: { completed: false, highScore: null }
		};

		userMiniGameStatus.once("value").then(
			snapshot => {
				userMiniGameStatus.update(miniGames);
				that.props.MiniGamesCompletedActions.miniGamesCompleted(miniGames);
			},
			errorObject => {
				console.log("The read failed: " + errorObject.code);
			}
		);
	}

	showMiniGameStatus() {
		document.getElementById("showMiniGameStatus").style.display = "none";
		document.getElementById("miniGameButton").style.display = "block";
	}

	showLessonStatus() {
		document.getElementById("showLessonStatus").style.display = "none";
		document.getElementById("lessonButton").style.display = "block";
	}

	showIntroSongsStatus() {
		document.getElementById("showIntroSongsStatus").style.display = "none";
		document.getElementById("introSongsButton").style.display = "block";
	}

	deleteMiniGameStatus() {
		let that = this;
		let miniGamePopup = Popup.create({
			title: null,
			content: "Are you sure that you want to delete your Mini Game Data?",
			buttons: {
				left: [
					{
						text: "No",
						className: "danger",
						action: () => {
							Popup.alert("Your data will not be deleted");
							Popup.close();
						}
					}
				],
				right: [
					{
						text: "Yes",
						key: "enter",
						action: () => {
							that.resetMiniGameSettings();
							Popup.alert("Your data is deleted");
							Popup.close();
						}
					}
				]
			}
		});
	}

	deleteLessonStatus() {
		let that = this;
		let lessonPopup = Popup.create({
			title: null,
			content: "Are you sure that you want to delete your Lesson Data?",
			buttons: {
				left: [
					{
						text: "No",
						className: "danger",
						action: () => {
							Popup.alert("Your data will not be deleted");
							Popup.close();
						}
					}
				],
				right: [
					{
						text: "Yes",
						key: "enter",
						action: () => {
							that.resetLessonsSettings();
							Popup.alert("Your data is deleted");
							Popup.close();
						}
					}
				]
			}
		});
	}

		deleteIntroSongsStatus() {
		let that = this;
		let lessonPopup = Popup.create({
			title: null,
			content: "Are you sure that you want to delete your Intro Song Data?",
			buttons: {
				left: [
					{
						text: "No",
						className: "danger",
						action: () => {
							Popup.alert("Your data will not be deleted");
							Popup.close();
						}
					}
				],
				right: [
					{
						text: "Yes",
						key: "enter",
						action: () => {
							that.resetIntroSongsSettings();
							Popup.alert("Your data is deleted");
							Popup.close();
						}
					}
				]
			}
		});
	}

	render() {
		// if (!this.props.authenticated) {
		// 		return <Redirect to="/"/>
		// 	}
		let miniGamesNum = Object.values(this.props.miniGames).filter(game => {
			console.log(game, 'game')
			return game.completed !== false;
		});
		let lessonNum = Object.values(this.props.lessons).filter(lesson => {
			return lesson.completed !== false;
		});
		let introSongsNum = Object.values(this.props.introSongs).filter(song => {
			console.log(song, 'songs')
			return song !== false;
		});

		return (
			<div style={{ height: "100vh", width: "100vw", overflowY: "scroll" }}>
				<div
					style={{
						width: "80vw",
						height: "100vh",
						margin: "auto",
						backgroundColor: "white",
						flex: 1,
						overflowX: "scroll"
					}}
					className="effect8"
				>
					<div className="row" margin="1em" />
					<Popup />
					<div className="col-md-12">
						<h1>Profile Settings</h1>
					</div>
					<div className="row" style={{ margin: "auto", padding: "1em" }}>
						<div className="col-md-12">
							<table
								id="settingTable"
								className="table table-hover effect8"
								style={{ border: "none" }}
							>
								<tbody>
									<tr
										style={{ border: "none" }}
										onClick={() => {
											this.showChangeName();
										}}
									>
										<th style={{ border: "none" }}>Name</th>
										<td style={{ color: "grey", border: "none" }}>
											{this.props.profile.name
												? this.props.profile.name
												: "Not Set"}
										</td>
										<td id="changeName" style={{ border: "none" }}>
											<span style={{ color: "#365899", textAlign: "center" }}>
												{" "}
												Edit{" "}
											</span>
										</td>
										<td
											id="showChangeName"
											style={{ display: "none", border: "none" }}
										>
											<form
												onSubmit={event => {
													event.preventDefault;
													this.changeName(event);
												}}
											>
												<input
													id="newName"
													type="name"
													placeholder="Enter new name"
												/>
												<input
													type="submit"
													className="btn-info"
													placeholder="submit"
												/>
											</form>
										</td>
									</tr>
									<tr style={{ border: "none" }}>
										<th style={{ border: "none" }}>Email</th>
										<td style={{ border: "none", color: "grey" }}>
											{this.props.profile.email}
										</td>
										<td style={{ border: "none" }} />
									</tr>
									<tr
										onClick={() => {
											this.showChangePicture();
										}}
										style={{ border: "none" }}
									>
										<th style={{ border: "none" }}>Picture</th>
										<td style={{ border: "none" }}>
											<img
												src={
													this.props.profile.picture
														? this.props.profile.picture
														: require("../static/defaultUser.png")
												}
												style={{ height: "10em", width: "10em" }}
												className="effect8"
											/>
										</td>
										<td id="changePicture" style={{ border: "none" }}>
											<span style={{ color: "#365899", textAlign: "center" }}>
												{" "}
												Edit{" "}
											</span>
										</td>
										<td
											id="showChangePicture"
											style={{ display: "none", border: "none", width: "20em" }}
										>
											<label className="custom-file">
												<input
													type="file"
													id="photoupload"
													accept=".jpg, .jpeg, .png, .gif, .pdf"
													className="custom-file-input"
												/>
												<span
													className="custom-file-control"
													id="upload-file-info"
												/>
											</label>
										</td>
									</tr>
									<tr
										style={{ border: "none" }}
										onClick={() => {
											this.showMiniGameStatus();
										}}
									>
										<th style={{ border: "none" }}>Mini Games </th>
										<td style={{ border: "none", color: "grey" }}>
											Completed: {miniGamesNum.length}
										</td>
										<td id="showMiniGameStatus" style={{ border: "none" }}>
											<span style={{ color: "#365899", textAlign: "center" }}>
												{" "}
												Edit{" "}
											</span>
										</td>

										<td
											id="miniGameButton"
											style={{ border: "none", display: "none" }}
										>
											<button
												className="btn btn-primary"
												onClick={() => {
													this.deleteMiniGameStatus();
												}}
											>
												{" "}
												Delete Mini Games Status
											</button>
										</td>
									</tr>
									<tr
										style={{ border: "none" }}
										onClick={() => {
											this.showLessonStatus();
										}}
									>
										<th style={{ border: "none" }}>Lessons</th>
										<td style={{ border: "none", color: "grey" }}>
											Completed: {lessonNum.length}
										</td>
										<td id="showLessonStatus" style={{ border: "none" }}>
											<span style={{ color: "#365899", textAlign: "center" }}>
												{" "}
												Edit{" "}
											</span>
										</td>

										<td
											id="lessonButton"
											style={{ border: "none", display: "none" }}
										>
											<button
												className="btn btn-primary"
												onClick={() => {
													this.deleteLessonStatus();
												}}
											>
												{" "}
												Delete Lessons Status
											</button>
										</td>
									</tr>
									<tr
										style={{ border: "none" }}
										onClick={() => {
											this.showIntroSongsStatus();
										}}
									>
										<th style={{ border: "none" }}>Intro Songs</th>
										<td style={{ border: "none", color: "grey" }}>
											Completed: {introSongsNum.length}
										</td>
										<td id="showIntroSongsStatus" style={{ border: "none" }}>
											<span style={{ color: "#365899", textAlign: "center" }}>
												{" "}
												Edit{" "}
											</span>
										</td>

										<td
											id="introSongsButton"
											style={{ border: "none", display: "none" }}
										>
											<button
												className="btn btn-primary"
												onClick={() => {
													this.deleteIntroSongsStatus();
												}}
											>
												{" "}
												Delete Intro Songs Status
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const profileSettingsMapStateToProps = store => {
	return {
		profile: store.Auth,
		miniGames: store.MiniGamesCompleted,
		lessons: store.LessonsCompleted,
		introSongs: store.IntroSongsCompleted
	};
};

const profileSettingsDispatch = dispatch => {
	return {
		AuthActions: bindActionCreators(AuthActions, dispatch),
		LessonsCompletedActions: bindActionCreators(
			LessonsCompletedActions,
			dispatch
		),
		MiniGamesCompletedActions: bindActionCreators(
			MiniGamesCompletedActions,
			dispatch
		),
		IntroSongsCompletedActions: bindActionCreators(
			IntroSongsCompletedActions,
			dispatch
		)
	};
};

export default connect(profileSettingsMapStateToProps, profileSettingsDispatch)(
	ProfileSettings
);

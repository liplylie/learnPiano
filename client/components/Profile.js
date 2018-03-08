import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "../actions/authActions.js";
import { firebaseDB } from "../firebase";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lessonsCompleted: {
				lesson1: false,
				lesson2: false,
				lesson3: false,
				lesson4: false,
				lesson5: false
			},
			miniGamesCompleted: {
				miniGame1: false,
				miniGame2: false,
				miniGame3: false,
				miniGame4: false,
				miniGame5: false
			}
		};
	}

	componentWillMount() {
		let that = this;
		let userLessonStatus = firebaseDB.ref(
			"/users/" + this.props.userID + "/lessonsCompleted"
		);
		let userMiniGameStatus = firebaseDB.ref(
			"/users/" + this.props.userID + "/miniGamesCompleted"
		);
		userLessonStatus
			.once("value")
			.then(snapshot => {
				if (snapshot.val()) {
					that.setState({ lessonsCompleted: snapshot.val() });
				}
			})
			.catch(err => {
				console.log(err);
			});
		userMiniGameStatus
			.once("value")
			.then(snapshot => {
				if (snapshot.val()) {
					that.setState({ miniGamesCompleted: snapshot.val() });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	formatAMPM(date) {
		var hours = date[0] + date[1];
		var minutes = date[3] + date[4];
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12;
		var strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	render() {

		let lessonData = Object.entries(this.state.lessonsCompleted);
		let miniGameData = Object.entries(this.state.miniGamesCompleted);

		if (this.props.loading && this.props.online) {
			return (
				<div style={{ height: "100vh", padding: "10em" }}>
					<div className="loader" />
				</div>
			);
		}

		if (!this.props.Auth.online) {
			return <Redirect to="/" />;
		}
		return (
			<div
				style={{
					height: "100vh",
					width: "100vw",
					textAlign: "center",
					overflowY: "scroll"
				}}
			>
				<div
					style={{
						width: "80vw",
						height: "100vh",
						margin: "auto",
						backgroundColor: "white",
						flex: 1,
						overflowX: "scroll"
					}}
					className="effect8 fadeIn"
				>
					<div className="row" style={{ height: "7em" }} />
					<div className="row">
						<div className="col-md-1" />
						<div className="col-md-3">
							<div className="row" style={{ margin: "0.3em" }}>
								<img
									className="span3 wow flipInX center effect8"
									src={
										this.props.Auth.picture
											? this.props.Auth.picture
											: require("../static/defaultUser.png")
									}
									style={{
										height: "10em",
										width: "10em",
										borderRadius: "5px",
										visibility: "visible",
										animationName: "flipInX",
										margin: "auto"
									}}
								/>
								<span
									style={{
										fontFamily: "helvetica",
										fontSize: "2em",
										margin: "auto"
									}}
								>
									{this.props.Auth.name
										? this.props.Auth.name
										: this.props.Auth.email}
								</span>
							</div>
						</div>

						<div className="col-md-3" style={{ marginRight: "3em" }} />
						<div
							className="col-md-4 text-left wow fadeIn animated"
							style={{ margin: ".3em" }}
						>
							<Link
								to="/lessonOne"
								style={{ fontFamily: "helvetica", fontSize: "1.5em" }}
							>
								Lesson One
							</Link>
							<br />
							<Link
								to="/lessonTwo"
								style={{ fontFamily: "helvetica", fontSize: "1.5em" }}
							>
								Lesson Two
							</Link>
							<br />
							<Link
								to="/lessonThree"
								style={{ fontFamily: "helvetica", fontSize: "1.5em" }}
							>
								Lesson Three
							</Link>
							<br />
							<Link
								to="/lessonFour"
								style={{ fontFamily: "helvetica", fontSize: "1.5em" }}
							>
								Lesson Four
							</Link>
							<br />
							<Link
								to="/lessonFive"
								style={{ fontFamily: "helvetica", fontSize: "1.5em" }}
							>
								Lesson Five
							</Link>
						</div>
					</div>

					<div className="row wow fadeIn animated">
						<div className="col-md-11" style={{margin: "auto"}}>
							<table id="lessonTable" className="table effect8">
								<tbody>
									<tr style={{ backgroundColor: "lightgrey" }}>
										<th>Lessons</th>
										<th>Status</th>
										<th>Date Finished</th>
									</tr>
									{lessonData.map((data, i) => {
										return (
											<tr
												key={i}
												className={
													data[1].completed ? "Complete" : "NotComplete"
												}
											>
												<th>Lesson {i + 1}</th>
												<th>
													{data[1].completed ? `Completed` : `Not Completed`}{" "}
												</th>
												<th>
													{data[1].time
														? new Date(data[1].time).toString().split(" ")[0] +
														  " " +
														  new Date(data[1].time).toString().split(" ")[1] +
														  " " +
														  new Date(data[1].time).toString().split(" ")[2] +
														  ", " +
														  new Date(data[1].time).toString().split(" ")[3] +
														  " at " +
														  this.formatAMPM(
																new Date(data[1].time).toString().split(" ")[4]
														  )
														: ""}{" "}
												</th>
											</tr>
										);
									})}
								</tbody>
							</table>
							<table id="miniGameTable" className="table effect8">
								<tbody>
									<tr style={{ backgroundColor: "lightgrey" }}>
										<th>Mini Games</th>
										<th>Status</th>
										<th>High Score</th>
									</tr>
									{miniGameData.map((data, i) => {
										return (
											<tr
												key={i}
												className={
													data[1].completed ? "Complete" : "NotComplete"
												}
											>
												<th>Mini Game {i + 1}</th>
												<th>
													{data[1].completed ? `Completed` : `Not Completed`}{" "}
												</th>
												<th>
													{data[1].highScore ? `${data[1].highScore}` : ""}{" "}
												</th>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const ProfileMapStateToProps = store => {
	return {
		Auth: store.Auth
	};
};

const ProfileDispatch = dispatch => {
	return {
		actions: bindActionCreators(AuthActions, dispatch)
	};
};

export default connect(ProfileMapStateToProps, ProfileDispatch)(Profile);
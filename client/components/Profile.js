import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authActions.js'

class Profile extends Component{
	constructor(props){
		super(props)
	}

	formatAMPM(date) {
	  var hours = date[0];
	  var minutes = date[1];
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}

	render(){
		console.log(this.props, 'profile props')

		let lessonData = Object.entries(this.props.LessonsCompleted)
		console.log(lessonData, 'lessonData')
		if (this.props.loading && this.props.online){
			return (
				<div style={{height:"100vh", padding: "10em"}}>
	        <div className="loader">
	        </div>
        </div>
      );
		}

		if (!this.props.Auth.online) {
			return <Redirect to='/'/>
		}
		return (
			<div style={{height:"100vh", width:"100vw", textAlign: "center"}}>
				<div style={{width:"70vw", height: "100vh", margin:"auto", backgroundColor: "white", flex:1}}>
					<div className="row" style={{height: "8em"}}>
					</div>
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-3"> 
							<img className="span3 wow flipInX center" src={this.props.Auth.picture} style={{height: "10em", width:"10em", visibility: "visible", animationName: "flipInX"}}/>
						</div>
						<div className="col-md-4"></div>
						<div className="col-md-4 text-center"> <Link to="/lessonOne">lesson one</Link><br/><Link to="/lessonTwo">lesson two</Link></div>
					</div>
					<div className="row" style={{paddingTop: "1em", paddingBottom:"1em"}}>
						<div className="col-md-5 text-center">
						{this.props.Auth.name}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<table className="table">
								<tbody>
									<tr style={{backgroundColor: "lightgrey"}}>
										<th>Lessons</th>
										<th>Completed</th>
										<th>Date Finished</th>
									</tr>
									{lessonData.map((data, i) =>{
										return (
											<tr key={i} className={data[1].completed ? "Complete" : "NotComplete"}> 
												<th>lesson {i + 1}</th>
												<th>{data[1].completed ? `completed` : `not completed`} </th>
												<th>{data[1].time ? new Date(data[1].time).toString().split(" ")[0] + " " + new Date(data[1].time).toString().split(" ")[1] + " " + new Date(data[1].time).toString().split(" ")[2] + ", " +  new Date(data[1].time).toString().split(" ")[3] + " at " + this.formatAMPM(new Date(data[1].time).toString().split(" ")[4]): ""} </th>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const ProfileMapStateToProps = (store)=>{
	return{
		Auth: store.Auth,
		LessonsCompleted: store.LessonsCompleted
	}
}

const ProfileDispatch = (dispatch)=>{
	return{
		actions: bindActionCreators(AuthActions, dispatch)
	}
}


export default connect(ProfileMapStateToProps, ProfileDispatch)(Profile)
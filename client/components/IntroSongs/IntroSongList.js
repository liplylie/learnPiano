import React, { Component } from "react";
import { Link } from 'react-router-dom'

class IntroSongList extends Component {
	constructor() {
		super();
	}

	render() {
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
						overflowX: "scroll",
						overflowY: "scroll"
					}}
					className="effect8 wow fadeIn"
				>
					<div className="row" style={{ height: "7em" }} />
					<div className="row">
						<div className="col-md-12">
							<h1> Intro Song List</h1>
						</div>
					<div className="col-md-4" >
						<ol type="A" className="alphabetList">
							<li >
							</li>
							<li >
							</li>
							<li >
							</li>
							<li >
							</li>
							<li > 
							</li>
							<li >
							</li>
							<li >
							</li>
							<li>
								<ul>
									<Link to="/SongList/intro/HotCrossBuns">Hot Cross Buns</Link>
								</ul>
							</li>
						</ol>
					</div>
					<div className="col-md-4">
						<ol type="A" start="9" className="alphabetList">
							<li>
							</li>
							<li >
							</li>
							<li >
							</li>
							<li >
							</li>
							<li>
								<ul>
									<Link to="/SongList/intro/MaryHadLamb">Mary Had A Little Lamb</Link>
								</ul>
							</li>
							<li>
							</li>
							<li>
								<ul>
									<Link to="/SongList/intro/OdeToJoy">Ode To Joy</Link>
								</ul>
							</li>
							<li>
							</li>
						</ol>
					</div>
					<div className="col-md-4">
						<ol type="A" start="17" className="alphabetList">
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li>
							</li>
							<li >
							</li>
						</ol>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default IntroSongList;
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
						overflowX: "scroll"
					}}
					className="effect8 wow fadeIn"
				>
					<div className="row" style={{ height: "7em" }} />
					<div className="col-md-12">
						<h1> Intro Song List</h1>
						<ul>
							M
							<li>
							<Link to="/SongList/intro/MaryHadLamb">Mary Had A Little Lamb</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default IntroSongList;
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
							<h1> Intro Level Song List</h1>
							<p style={{color: "gray"}}>Contains songs for right hand only. No rhythm check!</p>
						</div>
					<div className="col-md-4 " >
						<ol type="A" className="alphabetList">
							<li >
							<ul>
									<li><Link to="/SongList/intro/AuClairDeLaLune">Au Clair De La Lune</Link></li>
								</ul>
								<ul>
									<li><Link to="/SongList/intro/AuraLee">Aura Lee</Link></li>
								</ul>
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
							<ul>
									<Link to="/SongList/intro/GoodKingWEnceslas">Good King Winceslas</Link>
								</ul>
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
							<li>
								<ul>
									<li><Link to="/SongList/intro/JingleBells">Jingle Bells</Link></li>
								</ul>
							</li>
							<li>
							</li>
							<li>
								<ul>
									<li><Link to="/SongList/intro/LightlyRow">Lightly Row</Link></li>
								</ul>
								<ul>
									<li><Link to="/SongList/intro/LoveSomebody">Love Somebody</Link></li>
								</ul>
							</li>
							<li>
								<ul>
									<li><Link to="/SongList/intro/MaryHadLamb">Mary Had A Little Lamb</Link></li>
								</ul>
								<ul>
									<li><Link to="/SongList/intro/Musette">Musette</Link></li>
								</ul>
							</li>
							<li>
								<ul>
									<Link to="/SongList/intro/NewWorldSymphony">New World Symphony</Link>
								</ul>
							</li>
							<li>
								<ul>
									<li><Link to="/SongList/intro/OdeToJoy">Ode To Joy</Link></li>
								</ul>
								<ul>
									<li><Link to="/SongList/intro/OatsAndBeans">Oats And Beans And Barley Grows</Link></li>
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
								<ul>
									<Link to="/SongList/intro/SaintsGoMarchin">Saints Go Marchin</Link>
								</ul>
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
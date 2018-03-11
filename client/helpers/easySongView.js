import React, { Component } from "react";


const easySongView = (note, index, correctAnswers, noteClass) =>{
		if (note === "C4") {
			return (
				<img
					key={index}
			  	id={`MaryHad${index}`}
			 	  className={`playMusicNote noteOrderFourth note${note} ${correctAnswers === index ? noteClass : ""}`}
			  	src={require("../static/musicNoteLine.png")}
			  	style={{display:"none"}}
				/>
			)
		} else {
			return (
			<img
				key={index}
			  id={`MaryHad${index}`}
			  className={`playMusicNote noteOrderFourth note${note} ${correctAnswers === index ? noteClass : ""}`}
			  src={require("../static/quarterNote.png")}
			  style={{display:"none"}}
			/>
		)
		}
	}

	export default easySongView
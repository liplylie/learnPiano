import React, { Component } from "react";


const easySongView = (note, index, correctAnswers, noteClass, songName, limit) =>{
		let noteOrder, display
		if (index <= limit){
			if (index === 1){
			noteOrder = "First"
		} else if (index === 2){
			noteOrder = "Second"
		} else if (index === 3){
			noteOrder = "Third"
		} else {
			noteOrder = "Fourth"
		}

		if ( index < 5 ) {
			display= "block"
		} else {
			display = "none"
		}
		
		if (note === "C4") {
			return (
				<img
					key={index}
			  	id={`${songName}${index}`}
			 	  className={`playMusicNote noteOrder${noteOrder} note${note} ${correctAnswers === index ? noteClass : ""}`}
			  	src={require("../static/musicNoteLine.png")}
			  	style={{display:display}}
				/>
			)
		}	else {
			return (
				<img
					key={index}
				  id={`${songName}${index}`}
				  className={`playMusicNote noteOrder${noteOrder} note${note} ${correctAnswers === index ? noteClass : ""}`}
				  src={require("../static/quarterNote.png")}
				  style={{display:display}}
				/>
			)
		} 
	} else {
		return (
			 <img
			 		key={index}
          id={`${songName}${index}`}
          style={{display:"none", left: 0}}
      />
		)
	}
		
}

export default easySongView

import React, { Component } from "react";
/**
 * easySongView generates the html for the notes of easy song for the introduction songs.
 * @param {string} note - The note that is being rendered to the view. 
 * @param {integer} index - The index coming from the inputted note array. Needed for the id of the img.
 * @param {integer} correctAnswers - the number of correct answers in the lesson so far
 * @param {string} noteClass - the ClassName that renders the note as a correct or incorrect note
 * @param {string} songName - the name of the song. Needed for the id of the img.
 * @param {integer} limit - the length of the inputted note array. Once it is reached, 3 blank images will render.
*/

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
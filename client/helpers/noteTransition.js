/**
 * @param {string} SongName - The name of the song.
 * @param {integer} correctAnswers - number of correct notes answered.
*/


const noteTransition=(SongName, correctAnswers)=>{
	let getCssProperty = (elmId, property) => {
    let elem = document.getElementById(elmId);
    return window.getComputedStyle(elem,null).getPropertyValue(property);
	}
		let transitionSpeed = 5
		let nextNumber = correctAnswers + 4
	  let noteOne = getCssProperty(`${SongName}1`, "left");
		noteOne = Number(noteOne.substring(0, noteOne.length - 2))
		let noteTwo = getCssProperty(`${SongName}2`, "left")
		noteTwo = Number(noteTwo.substring(0, noteTwo.length - 2))
		let noteThree = getCssProperty(`${SongName}3`, "left")
		noteThree = Number(noteThree.substring(0, noteThree.length - 2))
		let noteFour = getCssProperty(`${SongName}4`, "left")
		noteFour = Number(noteFour.substring(0, noteFour.length - 2))
		let movingDistance = noteTwo - noteOne
		let moveFirst = () => {
		    if (noteOne <= 100){
		        clearInterval(moveFirstNote)
		        document.getElementById(`${SongName}1`).style.display = "none"
		        document.getElementById(`${SongName}1`).id = ""
		    } else {
		        noteOne -= 10
		        document.getElementById(`${SongName}1`).style.left = noteOne + "px"
		    }
		}
		let moveFirstNote = setInterval(moveFirst, transitionSpeed)
		let moveOthers = () => {
		    if (movingDistance <=0){
		        clearInterval(moveOtherNotes)
		        document.getElementById(`${SongName + nextNumber}`).style.display = "block"
		        document.getElementById(`${SongName}2`).id = `${SongName}1`
		        document.getElementById(`${SongName}3`).id = `${SongName}2`
		        document.getElementById(`${SongName}4`).id = `${SongName}3`
		        document.getElementById(`${SongName + nextNumber}`).id = `${SongName}4`
		    } else {
		        noteTwo -= 10
		        noteThree -= 10
		        noteFour -= 10
		        movingDistance -= 10
		        document.getElementById(`${SongName}2`).style.left = noteTwo + "px"
		        document.getElementById(`${SongName}3`).style.left = noteThree + "px"
		        document.getElementById(`${SongName}4`).style.left = noteFour + "px"
		    }
		}
		let moveOtherNotes = setInterval(moveOthers, transitionSpeed)
}

export default noteTransition
export function lessonsCompleted(info){
	return{
		type: "USER_LESSONS_COMPLETED",
		payload: info
	}
}
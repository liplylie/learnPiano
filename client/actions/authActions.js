export function logOutAction(onlineStatus){
	return {
	type: "USER_LOGOUT",
	payload: onlineStatus
	}
}

export function userLoginInfo(info){
	return{
		type: "USER_LOGIN_INFO",
		payload: info
	}
}
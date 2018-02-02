import { combineReducers } from 'redux'
import Auth from './authReducer'
import LessonsCompleted from './lessonsCompletedReducer'
import MiniGamesCompleted from './miniGamesCompletedReducer'

const reducer = combineReducers({
	Auth,
	LessonsCompleted,
	MiniGamesCompleted
})

export default reducer
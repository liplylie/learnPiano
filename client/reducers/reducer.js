import { combineReducers } from 'redux'
import Auth from './authReducer'
import LessonsCompleted from './lessonsCompletedReducer'
import MiniGamesCompleted from './miniGamesCompletedReducer'
import IntroSongsCompleted from './introSongsCompletedReducer'

const reducer = combineReducers({
	Auth,
	LessonsCompleted,
	MiniGamesCompleted,
	IntroSongsCompleted
})

export default reducer
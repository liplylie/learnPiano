import { combineReducers } from 'redux'
import Auth from './authReducer'
import LessonsCompleted from './lessonsCompletedReducer'

const reducer = combineReducers({
	Auth,
	LessonsCompleted
})

export default reducer
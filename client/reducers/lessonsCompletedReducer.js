const initialState = {
  lessonOne: false,
  lessonTwo: false,
  lessonThree: false,
  lessonFour: false,
  lessonFive: false
}

const lessonsCompletedReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_LESSONS_COMPLETED': {
      return Object.assign({}, state, {
        lessonOne: action.payload.lessonOne,
        lessonTwo: action.payload.lessonTwo,
        lessonThree: action.payload.lessonThree,
        lessonFour: action.payload.lessonFour,
        lessonFive: action.payload.lessonFive
      })
    }
     default: {
      return state
    }
  }
}

export default lessonsCompletedReducer
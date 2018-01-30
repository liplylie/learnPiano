const initialState = {
  lesson1: false,
  lesson2: false
}

const lessonsCompletedReducer = (state=initialState, action) => {
  console.log(action, 'actions from lessonsCompletedReducer')
  switch(action.type) {
    case 'USER_LESSONS_COMPLETED': {
      return Object.assign({}, state, {
        lesson1: action.payload.lesson1,
        lesson2: action.payload.lesson2
      })
    }
     default: {
      return state
    }
  }
}

export default lessonsCompletedReducer
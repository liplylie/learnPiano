const initialState = {
  lesson1: false,
  lesson2: false,
  lesson3: false,
  lesson4: false,
  lesson5: false
}

const lessonsCompletedReducer = (state=initialState, action) => {
  console.log(action, 'actions from lessonsCompletedReducer')
  switch(action.type) {
    case 'USER_LESSONS_COMPLETED': {
      return Object.assign({}, state, {
        lesson1: action.payload.lesson1,
        lesson2: action.payload.lesson2,
        lesson3: action.payload.lesson3,
        lesson4: action.payload.lesson4,
        lesson5: action.payload.lesson5
      })
    }
     default: {
      return state
    }
  }
}

export default lessonsCompletedReducer
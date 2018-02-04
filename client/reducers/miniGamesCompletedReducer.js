const initialState = {
  miniGame1: false,
  miniGame2: false,
  miniGame3: false,
  miniGame4: false,
  miniGame5: false
}

const miniGamesCompletedReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_MINIGAMES_COMPLETED': {
      return Object.assign({}, state, {
        miniGame1: action.payload.miniGame1,
        miniGame2: action.payload.miniGame2,
        miniGame3: action.payload.miniGame3,
        miniGame4: action.payload.miniGame4,
        miniGame5: action.payload.miniGame5
      })
    }
     default: {
      return state
    }
  }
}

export default miniGamesCompletedReducer
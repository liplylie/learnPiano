const initialState = {
  online: false,
  name: '',
  userId: '',
  picture: '',
  email: '',
  error: null
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN_INFO': {
      return Object.assign({}, state, {
        online: true,
        name: action.payload.name,
        userId: action.payload.ID,
        picture: action.payload.picture,
        email: action.payload.email
      })
    }
    case 'USER_LOGOUT': {
      return Object.assign({}, state, {
        online: action.payload,
        name: '',
        userId: '',
        picture: '',
        email: '',
        error: null
      });
    }
     default: {
      return state
    }
  }
}

export default authReducer
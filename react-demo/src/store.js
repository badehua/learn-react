import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default: 
      return state
  }
}

const initalUser = {
  loading: false,
  isLogin: false
}
const userReducer = (state = initalUser, action) => {
  switch (action.type) {
    case 'requestLogin':
      return {
        loading: true,
        isLogin: false
      }
    case 'hasLogin':
      return {
        loading: false,
        isLogin: true
      }
    default:
      return {
        loading: false,
        isLogin: false
      }
  }
}

const store = createStore(combineReducers({counterReducer,userReducer}),applyMiddleware(logger,thunk))

export default store
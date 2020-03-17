const mapStateUser = state => ({initalUser: state.userReducer})
const mapDispatchUser = {
  requestLogin: () => ({type: 'requestLogin'}),
  hasLogin: () => ({type: 'hasLogin'}),
  login: () => dispatch => {
    dispatch({type: 'requestLogin'})
    setTimeout(() => {
      dispatch({type: 'hasLogin'})
    },2000)
  }
}


export {mapStateUser, mapDispatchUser}
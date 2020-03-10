import React from 'react'
// import store from '../store'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ num: state.counterReducer })
const mapDispatchToProps = {
  add: () => ({type: 'add'}),
  minus: () => ({type: 'minus'}),
  asyncAdd: () => dispatch => {
    setTimeout(() => {
      dispatch({type: 'add'})
    },2000)
  }
}

// function ReduxTest({num,add,minus}) {
//   return (
//     <div>
//       <button onClick = { minus} > - </button> 
//       { num }
//       <button onClick = { add } > + </button> 
//     </div>
//   )
// }

// export default connect(mapStateToProps,mapDispatchToProps)(ReduxTest)

// 使用装饰器报错，修改config-overrides.js并启用vscode的experimentalDecorators配置
@connect(mapStateToProps,mapDispatchToProps)
class ReduxTest extends React.Component {
  render() {
    const {num, add, minus, asyncAdd} = this.props
    return (
      <div>
        <div>
          <button onClick = { minus} > - </button> 
          { num }
          <button onClick = { add } > + </button> 
        </div>
        <button onClick = { asyncAdd }>asyncAdd</button>
      </div>
    )
  }
}

export default ReduxTest
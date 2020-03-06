import React, { useContext, Component } from 'react'

const ageContext = React.createContext()
const { Provider, Consumer } = ageContext

// 方式1   使用Consumer消费
function Child1(props) {
  return <div>Age: {props.age}</div>
}

// 方式2  使用Hook
function Child2() {
  const ageObj = useContext(ageContext)
  return <div>Age: {ageObj.age}</div>
}

// 方式3 使用 contextType
class Child3 extends Component {
  static contextType = ageContext
  render() {
    return <div>Age: {this.context.age}</div>
  }
}

function Child() {
  return <div>
    <Provider value={{age: 20}}>
      <Consumer>
        {value => {return <Child1 {...value}></Child1>}}
      </Consumer>

      <Child2></Child2>

      <Child3></Child3>
    </Provider>
  </div>
}

export default function ContextUse() {
  return (
    <div>
      <Child />
    </div>
  )
}

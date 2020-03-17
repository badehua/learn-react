import React from 'react'
import { BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateUser, mapDispatchUser} from './ReduxUser'

function Home() {
  return <div>
    <ul>
      <li>
        <Link to="/home/default">default</Link>
      </li>
      <li>
        <Link to="/home/additional">additional</Link>
      </li>
    </ul>
  </div>
}
function Default({match, history}) {
  return <div>
    {match.params.desc}
    <button onClick={() => history.goBack()}>返回</button>
    </div>
}

function About() {
  return <div>
    <ul>
      <li>
        <Link to="/about/me">我的信息</Link>
      </li>
      <li>
        <Link to="/about/service">我的服务</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/about/me" component={() => <div>myInfo</div>}></Route>
      <Route path="/about/service" component={() => <div>myService</div>}></Route>
      <Redirect to="/about/me"></Redirect>
    </Switch>
  </div>
}
function NoSwitch({location}) {
  console.log(location)
  return <div>404, the path "{location.pathname}" is not find  </div>
}

// 路由守卫
// 期待用法 <PrivateRoute component={About} path="/about" ....></PrivateRoute>
@connect(mapStateUser, mapDispatchUser)
class PrivateRoute extends React.Component {
  render() {
    const {component: Comp, initalUser, ...rest} = this.props
    const { isLogin } = initalUser
    console.log(Comp, isLogin)
    return  <Route {...rest} render= { props => 
      isLogin ? (<Comp></Comp>) : (<Redirect to={{
        pathname:'/login',
        state: {redirect: props.location.pathname}
      }} ></Redirect>)
    }></Route>
  }
}
@connect(mapStateUser, mapDispatchUser)
class Login extends React.Component {
  render() {
    const { location, login,  initalUser} = this.props
    const { isLogin, loading } = initalUser
    console.log(isLogin, login, loading,initalUser)
    const redirectTo = location.state.redirect || '/'
    if(isLogin) {
      return <Redirect to={ redirectTo }></Redirect>
    }
    return <div>
      <h3>用户登录</h3>
      <button onClick={ login }>{ loading? '登陆中。。。' : '登录'}</button>
    </div>
  }
}

export default function RouteSample() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home/:desc" component={Default}></Route>
          <Route path="/login" component={ Login }></Route>
          <PrivateRoute path="/about" component={About}></PrivateRoute>
          <Route component={ NoSwitch }></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

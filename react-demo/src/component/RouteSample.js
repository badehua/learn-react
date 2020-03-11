import React from 'react'
import { BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'

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
function Additional() {
  return <div>附加首页</div>
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

export default function RouteSample() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home/:desc" component={Default}></Route>
          <Route path="/about" component={About}></Route>
          <Route component={ NoSwitch }></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

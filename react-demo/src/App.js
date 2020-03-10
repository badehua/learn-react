import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Comment from './component/Comment'
// import ContextTest from './component/ContextTest'
// import AntdDemo from './component/AntdDemo'
// import HookCom from './component/HookCom'
// import ContextUse from './component/ContextUse'
import ReduxTest from './component/ReduxTest'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <h1>Hello world!</h1>

        <Comment author={{name:'王琦',avatarUrl:logo}} text="这是一个评论" date={new Date()}/> */}

        {/* <ContextTest /> */}

        {/* <AntdDemo></AntdDemo> */}

        {/* <HookCom></HookCom> */}

        {/* <ContextUse></ContextUse> */}
        
        <Provider store={store}>
          <ReduxTest></ReduxTest>
        </Provider>
      </header>
    </div>
  );
}

export default App;

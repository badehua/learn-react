import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comment from './component/comment'

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
        <h1>Hello world!</h1>
        <Comment author={{name:'王琦',avatarUrl:logo}} text="这是一个评论" date={new Date()}/>
      </header>
    </div>
  );
}

export default App;
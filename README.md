# learn-react

## 创建react app
`npx create-react-app 项目名 `

国内使用 npm 速度很慢，可使用淘宝镜像</br>
`cnpm install -g create-react-app ` </br>
`create-react-app 项目名 ` 

## jsx - js的语法扩展
+ 在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用，不强制但建议使用 </br>
+ 嵌套多个 HTML 标签，需要使用一个 div 元素包裹它 </br>
+ JavaScript 表达式写在花括号 {} 中 </br>
+ React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，React 会在指定元素数字后自动添加 px </br>
+ 注释写法： {/* 注释... */} </br>
+ Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用 </br>
    ```
    const element = (
      <h1 className="greeting">
        Hello, world!
      </h1>
    );
    ```
    等价于
    ```
    const element = React.createElement(
      'h1',
      {className: 'greeting'},
      'Hello, world!'
    );
    ```
+ 为了便于阅读，我们会将 JSX 拆分为多行。同时，我们建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱

## 元素渲染
+ ReactDOM.render() 将元素渲染成DOM
    ```
    <div id="root"></div>

    const ele = (<h1>Hello world!</h1>);
    ReactDom.render(ele, document.getElementById('root'))
    ```
+ React 元素被创建后无法更改子元素或属性，更新的方式是重新创建一个元素 </br>
+ React 只更新需要变化的部分


## 组件
+ 函数组件 && ES6 class 组件
  ```
  function MyCom(props) {
    return <h1>welcome,{props.name}</h1>
  }
  ```
  ```
  class MyCom extends React.Component {
    render () {
      return <h1>welcome,{this.props.name}</h1>
    }
  }
  ```
  注意点：</br>
  1.组件名首字母大写，React 会将以小写字母开头的组件视为原生 DOM 标签</br>
  2.ES6 class 组件 通过render返回</br>
  3.函数组件props拿来即用，class组件通过this.props使用</br>
+ 渲染组件
当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”
  ```
  const element = (<MyCom name="Sara" />);
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```
+ 组合组件</br>
组件可以在其输出中引用其他组件</br>
+ 提取组件</br>
将组件拆分为更小的组件</br>
+ props只读性</br>
所有 React 组件都必须像纯函数一样保护它们的 props 不被更改

## state
+ ES6 class 类添加一个类构造函数来初始化状态 this.state，类组件应始终使用 props 调用基础构造函数（即使用 props 参数来调用父类的构造函数）</br>
+ 可将生命周期方法添加class中</br>
+ 可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段</br>
  ```
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  ```
+ 正确使用state</br>
  1.使用setSate()更改state值</br>
  2.state更新可能是异步的
  ```
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  ```
  ```
  // Correct
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  ```
  3.state的更新会被合并</br>

+ 单向数据流</br>
  1.不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件</br>
  2.组件可以选择把它的 state 作为 props 向下传递到它的子组件中</br>
  3.子组件无法得知其 props 来自于父组件 state 或 props</br>
+ 在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然

## 事件处理
+ React 事件的命名采用小驼峰式（camelCase），而不是纯小写</br>
+ 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串</br>
+ 必须显式的使用 preventDefault 阻止默认行为</br>
+ this绑定：建议在构造器中绑定或使用 class fields 语法来避免这类性能问题</br>
  ```
  // 在构造器中绑定
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};

      // 为了在回调中使用 `this`，这个绑定是必不可少的
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }

    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }

  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  );
  ```
  ```
  // class fields 语法
  class LoggingButton extends React.Component {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    // 注意: 这是 *实验性* 语法。
    handleClick = () => {
      console.log('this is:', this);
    }

    render() {
      return (
        <button onClick={this.handleClick}>
          Click me
        </button>
      );
    }
  }
  ```
+ 传参
  ```
  // 箭头函数 事件对象必须显式的进行传递
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

  // Function.prototype.bind  事件对象以及更多的参数将会被隐式的进行传递
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```
## 条件渲染
+ if语句
+ && 与运算符
+ 三目运算符
+ 阻止组件渲染，返回null

## 列表与key
+ map函数</br>
  ```
  // 通过jsx内嵌map
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()} value={number} />
        )}
      </ul>
    );
  }
  ```
+ key: 当你创建一个元素时，必须包括一个特殊的 key 属性</br>
  元素的 key 只有放在就近的数组上下文中才有意义(在 map() 方法中的元素需要设置 key 属性)</br>
  key 只是在兄弟节点之间必须唯一</br>
  key 不会传递给你的组件</br>

## 表单
+ 受控组件
  input textarea select
+ 非受控组件

## 状态提升
在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state

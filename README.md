# learn-react

## 创建react app
`npx create-react-app 项目名 `

国内使用 npm 速度很慢，可使用淘宝镜像</br>
`cnpm install -g create-react-app ` </br>
`create-react-app 项目名 ` 

## 核心概念
### jsx - js的语法扩展
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

### 元素渲染
+ ReactDOM.render() 将元素渲染成DOM
    ```
    <div id="root"></div>

    const ele = (<h1>Hello world!</h1>);
    ReactDom.render(ele, document.getElementById('root'))
    ```
+ React 元素被创建后无法更改子元素或属性，更新的方式是重新创建一个元素 </br>
+ React 只更新需要变化的部分


### 组件
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

### state
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

### 事件处理
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

### 条件渲染
+ if语句
+ && 与运算符
+ 三目运算符
+ 阻止组件渲染，返回null

### 列表与key
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

### 表单
+ 受控组件
  input textarea select
+ 非受控组件

### 状态提升
在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state

### 组合和继承
+ 推荐使用组合而非继承来实现组件间的代码重用</br>
+ 包含关系</br>
  有些组件无法提前知晓它们子组件的具体内容。使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中
  ```
  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
  ```
  ```
  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        // 通过 JSX 嵌套，将任意组件作为子组件传递
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
  }
  ```
  少数情况下，不使用 children，可自行确定
  ```
  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }

  function App() {
    return (
      <SplitPane
        left={
          <Contacts />
        }
        right={
          <Chat />
        } />
    );
  }
  ```
+ 特例关系</br>
  有些时候，我们会把一些组件看作是其他组件的特殊实例
  ```
  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
      </FancyBorder>
    );
  }

  function WelcomeDialog() {
    return (
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />

    );
  }
  ```
  ```
  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
        {props.children}
      </FancyBorder>
    );
  }

  class SignUpDialog extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.state = {login: ''};
    }

    render() {
      return (
        <Dialog title="Mars Exploration Program"
                message="How should we refer to you?">
          <input value={this.state.login}
                onChange={this.handleChange} />

          <button onClick={this.handleSignUp}>
            Sign Me Up!
          </button>
        </Dialog>
      );
    }

    handleChange(e) {
      this.setState({login: e.target.value});
    }

    handleSignUp() {
      alert(`Welcome aboard, ${this.state.login}!`);
    }
  }
  ```
+ 组件可以接受任意 props，包括基本数据类型，React 元素以及函数</br>
+ 使用继承来构建组件层次。如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们

## 进阶
### 无障碍
+ JSX 支持所有 aria-* HTML 属性</br>
+ 语义化</br>
  使用 Fragment ,允许将子列表分组，而无需向 DOM 添加额外节点</br>
  不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候,可使用短语法</br>
  key 是唯一可以传递给 Fragment 的属性
  ```
  function ListItem({ item }) {
    return (
      <>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </>
    );
  }
  ```
+ for 在 JSX 中应该被写作 htmlFor

### 代码分隔
+ 动态 import() 语法
  ```
  import("./math").then(math => {
    console.log(math.add(16, 26));
  });
  ```
+ React.lazy</br>
  React.lazy 和 Suspense 技术还不支持服务端渲染</br>
  ```
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  ```
  React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件</br>
  然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）</br>
  ```
  function MyComponent() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    );
  }
  ```
  fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件</br>
  异常捕获
  ```
  import MyErrorBoundary from './MyErrorBoundary';
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

  const MyComponent = () => (
    <div>
      <MyErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            <OtherComponent />
            <AnotherComponent />
          </section>
        </Suspense>
      </MyErrorBoundary>
    </div>
  );
  ```
+ 基于路由的代码分割
  ```
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  import React, { Suspense, lazy } from 'react';

  const Home = lazy(() => import('./routes/Home'));
  const About = lazy(() => import('./routes/About'));

  const App = () => (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </Switch>
      </Suspense>
    </Router>
  );
  ```
+ 命名导出</br>
  React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件
  ```
  // ManyComponents.js
  export const MyComponent = /* ... */;
  export const MyUnusedComponent = /* ... */;
  // MyComponent.js
  export { MyComponent as default } from "./ManyComponents.js";
  // MyApp.js
  import React, { lazy } from 'react';
  const MyComponent = lazy(() => import("./MyComponent.js"));
  ```
### Context
+ 共享那些对于一个组件树而言是“全局”的数据，无需为每层组件手动添加 props
+ Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的<b><u>复用性变差</u></b>
+ api</br>
  `React.createContext`
  ```
  const MyContext = React.createContext(defaultValue);
  ```
  `Context.Provider`
  ```
  <MyContext.Provider value={/* 某个值 */}>
  ```
  `Class.contextType` 或 使用 static 这个类属性来初始化你的 contextType
  ```
  MyClass.contextType = MyContext;
  ```
  `Context.Consumer` 这能让你在函数式组件中完成订阅 context
  ```
  <MyContext.Consumer>
    {value => /* 基于 context 值进行渲染*/}
  </MyContext.Consumer>
  ```
  `Context.displayName` React DevTools 使用该字符串来确定 context 要显示的内容。
  ```
  const MyContext = React.createContext(/* some value */);
  MyContext.displayName = 'MyDisplayName';

  <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
  <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
  ```
### 错误边界
+ 可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI
+ 使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息
  ```
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      logErrorToMyService(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
    }
  }
  // 然后你可以将它作为一个常规组件去使用：

  <ErrorBoundary>
    <MyWidget />
  </ErrorBoundary>
  ```
+ 只有 class 组件才可以成为错误边界组件
+ 注意：错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误

### Refs转发
+ Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧
  ```
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  // 你可以直接获取 DOM button 的 ref：
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;
  ```
+ 注意</br>
  第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref</br>
  Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中</br>
+ 高阶组件中转发Refs
  ```
  // “logProps” HOC 透传（pass through）所有 props 到其包裹的组件
  function logProps(WrappedComponent) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return LogProps;
  }
  ```
  使用该 HOC 记录所有传递到 “fancy button” 组件的 props
  ```
  class FancyButton extends React.Component {
    focus() {
      // ...
    }

    // ...
  }

  // 我们导出 LogProps，而不是 FancyButton。
  // 虽然它也会渲染一个 FancyButton。
  export default logProps(FancyButton);
  ```
  refs 将不会透传下去,FancyButton 组件的 refs 实际上将被挂载到 LogProps 组件
  ```
  import FancyButton from './FancyButton';

  const ref = React.createRef();

  // 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
  // 尽管渲染结果将是一样的，
  // 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
  // 这意味着我们不能调用例如 ref.current.focus() 这样的方法
  <FancyButton
    label="Click Me"
    handleClick={handleClick}
    ref={ref}
  />;
  ```
  解决方法： React.forwardRef API 
  ```
  function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }

      render() {
        const {forwardedRef, ...rest} = this.props;

        // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
        return <Component ref={forwardedRef} {...rest} />;
      }
    }

    // 注意 React.forwardRef 回调的第二个参数 “ref”。
    // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
    // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
  }
  ```
+ DevTools 中显示自定义名称</br>
  React.forwardRef 接受一个渲染函数。React DevTools 使用该函数来决定为 ref 转发组件显示的内容
  ```
  // 以下组件将在 DevTools 中显示为 “ForwardRef”
  const WrappedComponent = React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
  ```
  ```
  // 如果命名了渲染函数，DevTools 也将包含其名称（例如 “ForwardRef(myFunction)”）：
  const WrappedComponent = React.forwardRef(
    function myFunction(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }
  );
  ```
  ```
  // 可以设置函数的 displayName 属性来包含被包裹组件的名称
  function logProps(Component) {
    class LogProps extends React.Component {
      // ...
    }

    function forwardRef(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }

    // 在 DevTools 中为该组件提供一个更有用的显示名。
    // 例如 “ForwardRef(logProps(MyComponent))”
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;

    return React.forwardRef(forwardRef);
  }
  ```
### 高阶组件（HOC）
+ 高阶组件是参数为组件，返回值为新组件的函数,是 React 中用于复用组件逻辑的一种高级技巧
+ HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能
+ HOC 和容器组件</br>
  容器组件担任分离将高层和低层关注的责任，由容器管理订阅和状态，并将 prop 传递给处理渲染 UI。HOC 使用容器作为其实现的一部分，你可以将 HOC 视为参数化容器组件
+ 约定：将不相关的 props 传递给被包裹的组件</br>
  HOC 为组件添加特性。自身不应该大幅改变约定，应该透传与自身无关的 props</br>
  大多数 HOC 都应该包含一个类似于下面的 render 方法
  ```
  render() {
    // 过滤掉非此 HOC 额外的 props，且不要进行透传
    const { extraProp, ...passThroughProps } = this.props;

    // 将 props 注入到被包装的组件中。
    // 通常为 state 的值或者实例方法。
    const injectedProp = someStateOrInstanceMethod;

    // 将 props 传递给被包装组件
    return (
      <WrappedComponent
        injectedProp={injectedProp}
        {...passThroughProps}
      />
    );
  }
  ```
+ 约定：最大化可组合性
+ 约定：包装显示名称以便轻松调试</br>
  最常见的方式是用 HOC 包住被包装组件的显示名称</br>
  ```
  function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {/* ... */}
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  ```
+ 注意</br>
  不要在 render 方法中使用 HOC</br>
  务必复制静态方法</br>
  用 hoist-non-react-statics 自动拷贝所有非 React 静态方法
  ```
  import hoistNonReactStatic from 'hoist-non-react-statics';
  function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
  }
  ```
  另一个可行的方案是再额外导出这个静态方法
  ```
  // 使用这种方式代替...
  MyComponent.someFunction = someFunction;
  export default MyComponent;

  // ...单独导出该方法...
  export { someFunction };

  // ...并在要使用的组件中，import 它们
  import MyComponent, { someFunction } from './MyComponent.js';
  ```

### Portals
  子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
  ```
  ReactDOM.createPortal(child, container)
  ```

### Profiler
+ 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”的API
+ Profiling 增加了额外的开支，在生产构建不使用，如需加在生产中，React 提供了使 profiling 可用的特殊的生产构建环境
+ 使用
  ```
  render(
    <App>
      <Profiler id="Navigation" onRender={callback}>
        <Navigation {...props} />
      </Profiler>
      <Main {...props} />
    </App>
  );
  ```
  需要两个prop： id  callback</br>
  此示例分析Navigation组件及其子代</br>
  多个 Profiler 组件能测量应用中的不同部分，也可嵌套使用测量同一子树下不同组件</br>
+ onRender函数
  function onRenderCallback(
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ) {
    // 合计或记录渲染时间。。。
  }

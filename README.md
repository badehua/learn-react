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
+ 为了便于阅读，我们会将 JSX 拆分为多行。同时，我们建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱。

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
所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
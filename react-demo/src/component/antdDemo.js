import React, { Component } from 'react'
// 按需加载  需引入react-app-rewired 及 customize-cra
import { Button } from 'antd'

export default class antdDemo extends Component {
  render() {
    return (
      <div>
        <Button type="primary">antd 按钮</Button>
      </div>
    )
  }
}
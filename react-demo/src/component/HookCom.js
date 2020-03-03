import React, { useState, useEffect } from 'react'

function useCount() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setCount(20)
    },2000)
  },[])
  return [count, setCount]
}

export default function HookCom() {
  const [count, setCount] = useCount()

  const [something, setSomething] = useState(['开会', '整理文档', '对接新需求'])
  const [doing, setDoing] = useState('写代码')
  const [addSomething, setAddSomething] = useState('')

  useEffect(() => {
    document.title = `点赞数：${count}`
  }, [count])
  return (
    <div>
      <p>点赞数：{count? count : 'loading...'}</p>
      <button onClick = {() => {setCount(count +1)}}>点赞</button>

      <p>进行中：{doing}</p>
      <h4>点击选择正在进行的事情：</h4>
      <ul>
        {
          something.map((f,index) => {
            console.log(f,index)
            return <li style={{textAlign: 'left'}} key= {index} onClick= {() => {setDoing(f)}}>{f}</li>
          })
        }
      </ul>
      <input type='text' value={addSomething} onChange={e => setAddSomething(e.target.value) }/>
      <button onClick={() => {
        setSomething([...something, addSomething])
        setAddSomething('')
      }}>增加待处理事件</button>
    </div>
  )
}

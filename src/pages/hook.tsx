import React, { useState, useEffect, PureComponent } from 'react'

type StatusManagerType = {
  status: boolean,
  cb: Function,
  subscribe: Function,
  unsubscribe: Function,
  switch: Function
}

const statusManager: StatusManagerType = {
  status: false,
  cb: () => {},
  subscribe(cb: Function) {
    this.cb = cb
  },
  unsubscribe() {
    this.cb = () => {}
  },
  switch() {
    this.status = !this.status
    this.cb(this.status)
  }
}

const useEnable = () => {

  const [ status, setStatus ] = useState(statusManager.status)

  useEffect(() => {

    statusManager.subscribe((enable: boolean) => {
      setStatus(enable)
    })

    return () => {
      statusManager.unsubscribe()
    }
  })

  return status
}

const PartOne = function() {

  const enable = useEnable()
  const switchStatus = () => {
    statusManager.switch()
  }

  return (
    <div>
      <p>part one</p>
      <p>{enable ? '可用' : '禁用'}状态</p>
      <button onClick={switchStatus}>点击切换状态</button>
    </div>
  )
}

const PartTwo = function() {

  const enable = useEnable()
  const switchStatus = () => {
    statusManager.switch()
  }

  return (
    <div>
      <p>part two</p>
      <p>{enable ? '可用' : '禁用'}状态</p>
      <button onClick={switchStatus}>点击切换状态</button>
    </div>
  )
}

export default class HookDemo extends PureComponent {

  state = {
    isPartOne: true
  }

  switchPart = () => {
    this.setState({isPartOne: !this.state.isPartOne})
  }

  render() {
    return (
      <div>
        <div>{this.state.isPartOne ? <PartOne /> : <PartTwo />}</div>
        <button onClick={this.switchPart}>点击切换 Part</button>
      </div>
    )
  }
}

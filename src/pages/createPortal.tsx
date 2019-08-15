import React, { PureComponent, useState } from 'react'
import {
  createPortal,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom'

const style = {
  width: '200px',
  lineHeight: 10,
  backgroundColor: 'skyblue',
  position: 'fixed' as 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center' as 'center'
}

class DialogOld extends PureComponent {
  constructor(props: {}) {
    super(props)
    document.body.appendChild(this.carrier)
  }

  componentDidMount() {
    this.renderPortal()
  }

  componentDidUpdate() {
    this.renderPortal()
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.carrier)
    document.body.removeChild(this.carrier)
  }

  render() {
    return null
  }

  renderPortal() {
    unstable_renderSubtreeIntoContainer(
      this,
      (
        <div style={style}>
          测试用的：old
        </div>
      ),
      this.carrier
    )
  }

  carrier = document.createElement('div')
}

class DialogNew extends PureComponent {
  constructor(props: {}) {
    super(props)
    document.body.appendChild(this.carrier)
  }

  componentWillUnmount() {
    document.body.removeChild(this.carrier)
  }

  render() {
    return createPortal(
      <div style={style}>
        测试用的：new
      </div>,
      this.carrier
    )
  }

  carrier = document.createElement('div')
}

export default function () {
  const [version, useVersion] = useState(0)
  const isOld = version === 0
  const switchVersion = () => useVersion(isOld ? 1 : 0)
  return (
    <div>
      {isOld ? <DialogOld /> : <DialogNew />}
      <p>
        <button onClick={switchVersion}>切换</button>
      </p>
    </div>
  )
}

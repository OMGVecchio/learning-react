import React, { PureComponent, ErrorInfo, useState } from 'react'

type Props = {
  count: number
}
type State = {
  count: number
}

class TestDemo extends PureComponent <Props, State> {

  state = {
    count: 0
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.count === state.count) {
      return {
        count: 0
      }
    }
    return null
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    return prevState.count
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: number) {
    console.log('sanpshot：', snapshot)
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info)
  }

  addCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>props：{this.props.count}</p>
        <p>state：{this.state.count}</p>
        <p>
          <button onClick={this.addCount}>
            增加 state
          </button>
        </p>
      </div>
    )
  }

}

export default () => {
  const [count, useCount] = useState(0)
  const addCount = () => useCount(count + 1)
  return (
    <div>
      <TestDemo count={count} />
      <p>
        <button onClick={addCount}>增加 props</button>
      </p>
    </div>
  )
}

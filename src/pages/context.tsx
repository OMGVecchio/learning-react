import React, { PureComponent, createContext } from 'react'

const ColorContext = createContext('red')
const SizeContext = createContext(20)

class Parent extends PureComponent {

  render() {
    return (
      <div>
        <ChildOne />
        <ChildTwo />
      </div>
    )
  }
}

// static contextType 直接绑定使用
class ChildOne extends PureComponent {

  static contextType = ColorContext

  render() {
    return (
      <div>
        <hr />
        <p>child_1</p>
        <p>
          {this.context}
        </p>
      </div>
    )
  }
}

// Context.Consumer 消费者模式调用
const ChildTwo = () => {

  return (<div>already hidden</div>)
  // return (
  //   <ColorContext.Consumer>
  //     {
  //       color => (
  //         <SizeContext.Consumer>
  //           {
  //             size => (
  //               <div>
  //                 <hr />
  //                 <p>child_2</p>
  //                 <p>color: {color}</p>
  //                 <p>size: {size}</p>
  //               </div>
  //             )
  //           }
  //         </SizeContext.Consumer>
  //       )
  //     }
  //   </ColorContext.Consumer>
  // )
}

export default class ContextDemo extends PureComponent {

  state = {
    color: 'red',
    size: 20
  }

  switchColor = () => {
    this.setState({
      color: this.state.color === 'red' ? 'blue' : 'red'
    })
  }

  switchSize = () => {
    this.setState({
      size: this.state.size === 20 ? 10 : 20
    })
  }

  render() {
    return (
      <ColorContext.Provider value={this.state.color}>
        <SizeContext.Provider value={this.state.size}>
          <Parent />
          <div>
            <button onClick={this.switchColor}>切换颜色</button>
            <button onClick={this.switchSize}>切换大小</button>
          </div>
        </SizeContext.Provider>
      </ColorContext.Provider>
    )
  }
}

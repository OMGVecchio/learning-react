import React, { PureComponent } from 'react'
import catPict from '../assets/cat.png'

type Point = {
  x: Number,
  y: Number
}

type MouseProps = {
  render: Function
}

class Cat extends PureComponent <Point> {

  render() {
    const point = this.props
    const style = {
      position: 'fixed' as 'fixed',
      top: `${ point.x }px`,
      left: `${ point.y }px`,
      width: '80px'
    }
    return (
      <img style={style} src={catPict} />
    )
  }
}

class Mouse extends PureComponent <MouseProps, Point> {

  state = {
    x: 0,
    y: 0
  }

  mouseMove = (e: React.MouseEvent) => {
    this.setState({
      x: e.clientY,
      y: e.clientX
    })
  }

  style: React.CSSProperties = {
    position: 'relative',
    margin: '0 auto',
    height: '800px',
    width: '800px',
    backgroundColor: 'skyblue'
  }

  render() {
    return (
      <div style={this.style} onMouseMove={this.mouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

export default class RenderPropsDemo extends PureComponent {

  catRender = (point: Point) => (
    <Cat x={point.x} y={point.y} />
  )

  render() {
    return (
      <Mouse render={this.catRender} />
    )
  }
}

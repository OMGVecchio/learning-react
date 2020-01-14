import React, { useRef, useContext } from 'react'

import { ComponentCtx } from '../pages/cms'

export default (componentItem: ICms.ComponentItem) => {
  const { dispatch } = useContext(ComponentCtx)
  // TODO 为啥这里的 useRef 的错，在这里没有错误提示，却提示在 cms1/cms2 调用时的 props 上了？
  // const componentRef = useRef()
  const componentRef = useRef(document.createElement('div'))
  const style: React.CSSProperties = {
    position: 'absolute',
    left: componentItem.x,
    top: componentItem.y
  }
  const dragStartHandler = (e: React.DragEvent) => {
    const {x, y} = (componentRef.current as any).getBoundingClientRect()
    const [offsetX, offsetY] = [e.pageX - x, e.pageY - y]
    const data = {
      isModify: true,
      index: componentItem.index,
      offsetX,
      offsetY
    }
    const dataFormat = JSON.stringify(data)
    e.dataTransfer.setData('componentInfo', dataFormat)
  }
  const focus = () => {
    componentItem.choiceComponent(componentItem.index, dispatch)
  }
  const commonProps = {
    draggable: true,
    style,
    onDragStart: dragStartHandler,
    onClick: focus,
    ref: componentRef
  }
  return [commonProps]
}

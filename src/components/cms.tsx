import React, { useRef, useContext } from 'react'

import { ComponentItem } from '../pages/cms'
import { ComponentCtx } from '../pages/cms'

export default (componentItem: ComponentItem) => {
  const { dispatch } = useContext(ComponentCtx)
  const componentRef = useRef()
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

import React, { useRef } from 'react'
import classname from 'classnames'
import { ComponentProps } from '@/models/cms.d'

const useComponent = ({
  componentItem,
  index,
  cms,
  dispatch
}: ComponentProps) => {
  // TODO 为啥这里的 useRef 的错，在这里没有错误提示，却提示在 cms1/cms2 调用时的 props 上了？
  // const componentRef = useRef()
  const componentRef = useRef(document.createElement('div'))
  const style: React.CSSProperties = {
    position: 'absolute',
    left: componentItem.x,
    top: componentItem.y
  }
  const setCurIndex = () => dispatch({
    type: 'cms/changeFocus',
    data: { index: index }
  })

  const dragStartHandler = (e: React.DragEvent) => {
    setCurIndex()
    const { x, y } = (componentRef.current as any).getBoundingClientRect()
    const [ offsetX, offsetY ] = [e.pageX - x, e.pageY - y]
    const data = {
      isModify: true,
      index: index,
      offsetX,
      offsetY
    }
    const dataFormat = JSON.stringify(data)
    e.dataTransfer.setData('componentInfo', dataFormat)
  }
  const dragEndHandler = (e: React.MouseEvent ) => {

  }
  const dragMoveHandler = (e: React.MouseEvent) => {

  }

  const commonProps = {
    // 不能用 draggable：不能限制拖拽界限，不能实时计算位置，drop 前的元素备份保持在原地
    draggable: true,
    onDragStart: dragStartHandler,

    onMouseDown: setCurIndex,
    // onMouseUp: dragEndHandler,
    // onMouseMove: dragMoveHandler,
    style,
    ref: componentRef,
    className: classname(
      'componentCommonStyle',
      cms.index === index && 'componentIsSelected'
    )
  }

  return [commonProps]
}

export default useComponent

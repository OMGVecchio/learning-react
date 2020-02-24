import React, { useRef } from 'react'
import { connect } from 'dva'
import style from '@/pages/cms/index.css'
import { ConnectProps, CommonProps } from '@/models/cms.d'

import Ruler from './ruler'
import renderCanavs from './render-canvas'

// 编辑器主题内容区
const CanvasContainer = ({
  cms,
  dispatch
}: CommonProps) => {
  // TODO 容器的 drop 应该限定事件类型，对新增或者修改作不同方式的处理
  // TODO useRef 为啥非得加个参数？纯粹是为了泛型做类型判断？针对不同的标签元素或者使用场景？
  const container = useRef(document.createElement('div'))
  const allowDrop = (e: React.DragEvent) => e.preventDefault()
  const dropHandler = (e: React.DragEvent) => {
    const { pageX, pageY } = e
    const { x = 0, y = 0 } = container.current.getBoundingClientRect()
    const [ relativeX, relativeY ] = [ pageX - x, pageY - y ]
    const dataParsed = JSON.parse(e.dataTransfer.getData('componentInfo'))
    const [ realX, realY ] = [ relativeX - dataParsed.offsetX, relativeY - dataParsed.offsetY ]
    if (dataParsed.isModify) {
      const { componentItem } = dataParsed
      componentItem.x = realX
      componentItem.y = realY
      dispatch({
        type: 'cms/modify',
        data: componentItem
      })
    } else {
      dataParsed.x = realX
      dataParsed.y = realY
      dispatch({
        type: 'cms/add',
        data: dataParsed
      })
    }
  }

  const width = 1920
  const height = 1080
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`
  }

  return (
    <div className={style.containerWrapper}>
      <Ruler width={width} height={height} />
      <div className={style.containerLayout}>
        <div
          className={style.container}
          // 解决 onDrop 事件不触发的问题
          onDragOver={allowDrop}
          onDrop={dropHandler}
          ref={container}
          style={containerStyle}
        >
          <>
            <div style={{height: '100px', width: '100px', lineHeight: '100px', backgroundColor: 'skyblue'}}>
              100 x 100
            </div>
            {renderCanavs(cms.componentList)}
          </>
        </div>
      </div>
    </div>
  )
}

export default connect(({ cms }: ConnectProps) => ({ cms }))(CanvasContainer)

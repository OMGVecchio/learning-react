import React from 'react'
import { ComponentTypes } from './render-component'

import style from '../../pages/cms/index.css'

// 组件选择栏
const DemoSidebar = () => {
  const dragHandler = (e: React.DragEvent) => {
    // TODO Error：Property 'getBoundingClientRect' does not exist on type 'EventTarget'。需要断言才行？
    const dragTarget = e.target as HTMLElement
    const { x, y } = dragTarget.getBoundingClientRect()
    const [ offsetX, offsetY ] = [ e.pageX - x, e.pageY - y ]
    const type = dragTarget.dataset.type
    const data = {
      type,
      offsetX,
      offsetY
    }
    const dataFormat = JSON.stringify(data)
    e.dataTransfer.setData('componentInfo', dataFormat)
  }
  return (
    <div className={style.demoSidebar}>
      <span
        className={style.demoIcon}
        draggable={true}
        data-type={ComponentTypes.cms1}
        onDragStart={dragHandler}
      >
        compont1
      </span>
      <span
        className={style.demoIcon}
        draggable={true}
        data-type={ComponentTypes.cms2}
        onDragStart={dragHandler}
      >
        compont2
      </span>
    </div>
  )
}

export default DemoSidebar

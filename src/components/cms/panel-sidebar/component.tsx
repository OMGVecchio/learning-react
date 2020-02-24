import React from 'react'
import { Collapse } from 'antd'
import style from '@/pages/cms/index.css'

import { ComponentTypes } from '../render-component'

const { Panel } = Collapse

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
    <Collapse defaultActiveKey={["1", "2", "3"]} className={style.demoSidebar}>
      <Panel header="基础控件" key="1">
        <span
          className={style.demoIcon}
          draggable={true}
          data-type={ComponentTypes.cms1}
          onDragStart={dragHandler}
        >
          select
        </span>
      </Panel>
      <Panel header="布局控件" key="2">
        <span
          className={style.demoIcon}
          draggable={true}
          data-type={ComponentTypes.cms2}
          onDragStart={dragHandler}
        >
          compont1
        </span>
      </Panel>
      <Panel header="表单控件" key="3">
        <span
          className={style.demoIcon}
          draggable={true}
          data-type={ComponentTypes.cms2}
          onDragStart={dragHandler}
        >
          compont2
        </span>
      </Panel>
    </Collapse>
  )
}

export default DemoSidebar

import React, { Suspense, useContext, useState, useEffect, createContext, useRef } from 'react'
import C1 from '../components/cms1'
import C2 from '../components/cms2'
import style from './cms.css'

export interface ComponentItem {
  index?: number,
  offsetX?: number,
  offsetY?: number,
  type: number,
  x: number,
  y: number
}

const ComponentCtx = createContext([])

const Container = () => {
  // TODO 容器的 drop 应该限定事件类型，对新增或者修改作不同方式的处理
  const {componentList, setComponentList}: any = useContext(ComponentCtx)
  const container: any = useRef()
  const allowDrop = (e: React.DragEvent) => e.preventDefault()
  const dragHandler = (e: React.DragEvent) => {
    const dragTarget = e.target as any;
    const {x, y} = dragTarget.getBoundingClientRect()
    const [offsetX, offsetY] = [e.pageX - x, e.pageY - y]
    const data = {
      type: +dragTarget.getAttribute('data-type'),
      offsetX,
      offsetY
    }
    const dataFormat = JSON.stringify(data)
    e.dataTransfer.setData('componentInfo', dataFormat)
  }
  const dropHandler = (e: React.DragEvent) => {
    const { pageX, pageY } = e
    const { x, y } = container.current.getBoundingClientRect()
    const [ relativeX, relativeY ] = [pageX - x, pageY - y]
    const dataParsed = JSON.parse(e.dataTransfer.getData('componentInfo'))
    if (dataParsed.isModify) {
      setComponentList((componentList: ComponentItem[]) => {
        const currentComponent = componentList[dataParsed.index]
        currentComponent.x = relativeX - dataParsed.offsetX
        currentComponent.y = relativeY - dataParsed.offsetY
        // TODO 数据更新的问题，假如直接不能通过 index 更新数据，不如新增时创建一个 id？或者采用 immutable？
        return componentList.concat()
      })
    } else {
      setComponentList((componentList: ComponentItem[]) => {
        return componentList.concat({
          type: dataParsed.type,
          x: relativeX - dataParsed.offsetX,
          y: relativeY - dataParsed.offsetY
        })
      })
    }
  }
  // TODO 组件的展现形式：通过数据驱动，在主容器内循环所有的操作逻辑进行渲染？
  // TODO 组件的公共特性：mixin 不易管理，hoc 感觉比较冗余，使用 renderProps 不如 用 hook 试试？
  const renderComponents = (componentList: ComponentItem[]) => {
    return componentList.map((componentItem, index) => {
      switch (componentItem.type) {
        case 1:
          return <C1 {...componentItem} index={index} key={index} />
        case 2:
          return <C2 {...componentItem} index={index} key={index} />
        default:
          return (<div>给个默认错误信息</div>)
      }
    })
  }
  return (
    <>
      <div
        className={style.container}
        // 解决 onDrop 事件不触发的问题
        onDragOver={allowDrop}
        onDrop={dropHandler}
        ref={container}
      >
        {renderComponents(componentList)}
      </div>
      <div>
        <Suspense fallback={'----loading---'}>
          <span
            className={style.demoIcon}
            draggable={true}
            data-type={1}
            onDragStart={dragHandler}
          >
            compont1
          </span>
          <span
            className={style.demoIcon}
            draggable={true}
            data-type={2}
            onDragStart={dragHandler}
          >
            compont2
          </span>
        </Suspense>
      </div>
    </>
  )
}

export default () => {
  const [componentList, setComponentList] = useState([])
  const props = {componentList, setComponentList}
  return (
    <ComponentCtx.Provider value={props}>
      <Container />
    </ComponentCtx.Provider>
  )
}

// TODO:FIX drop 时，组件放置会发生偏移：因为 drop 的放置点是鼠标当前的位置，但组件的左上角会移动但该放置点上

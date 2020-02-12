// 还是按照项目可能的技术来实现 demo，组件分离、数据层 dva 管理

import React, {
  useContext,
  createContext,
  useRef,
  useReducer,
  useMemo
} from 'react'
import { RouterTypes } from 'umi'
import { ComponentTypes } from '../../components/cms/render-component'
import renderCanavs from '../../components/cms/render-canvas'

import style from './index.css'

// store
const initialState: ICms.State = {
  componentList: [],
  index: -1
}
const reducer = (state: ICms.State, action: ICms.Action) => {
  const { componentList } = state
  const { data } = action
  switch (action.type) {
    case 'modify':
      // TODO 数据更新的问题，假如直接不能通过 index 更新数据，不如新增时创建一个 id？或者采用 immutable？
      const currentComponent = componentList[data.index]
      currentComponent.x = data.x
      currentComponent.y = data.y
      return {
        ...state,
        componentList: componentList
      }
    case 'add':
      return {
        ...state,
        index: componentList.length,
        componentList: componentList.concat({
          type: data.type,
          x: data.x,
          y: data.y,
          index: componentList.length
        })
      }
    case 'changeFocus':
      return {
        ...state,
        index: data.index
      }
    default:
      return state
  }
}
export const ComponentCtx = createContext({
  state: initialState,
  dispatch: ({}) => {}
})

// 编辑器主题内容区
const Container = () => {
  // TODO 容器的 drop 应该限定事件类型，对新增或者修改作不同方式的处理
  const { state, dispatch } = useContext(ComponentCtx)
  // TODO useRef 为啥非得加个参数？纯粹是为了泛型做类型判断？针对不同的标签元素或者使用场景？
  const container = useRef(document.createElement('div'))
  const allowDrop = (e: React.DragEvent) => e.preventDefault()
  const dropHandler = (e: React.DragEvent) => {
    const { pageX, pageY } = e
    const { x = 0, y = 0 } = container.current.getBoundingClientRect()
    const [ relativeX, relativeY ] = [ pageX - x, pageY - y ]
    const dataParsed = JSON.parse(e.dataTransfer.getData('componentInfo'))
    dataParsed.x = relativeX - dataParsed.offsetX
    dataParsed.y = relativeY - dataParsed.offsetY
    if (dataParsed.isModify) {
      dispatch({
        type: 'modify',
        data: dataParsed
      })
    } else {
      dispatch({
        type: 'add',
        data: dataParsed
      })
    }
  }

  return (
    <div
      className={style.container}
      // 解决 onDrop 事件不触发的问题
      onDragOver={allowDrop}
      onDrop={dropHandler}
      ref={container}
    >
      {renderCanavs(state.componentList)}
    </div>
  )
}
const ContainerWrapper = () => {
  return (
    <Container />
  )
}

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

// 组件属性栏
const AttributePanel = () => {
  const { state, dispatch } = useContext(ComponentCtx)
  // TODO 属性面板怎么来设计最合理？每个组件配置一个属性 config 列表参数，可继承并 disable 一些公共配置？
  const renderAttributeList = () => {
    return (
      <div>
        {state.index !== -1 && state.componentList[state.index].x}
      </div>
    )
  }
  return (
    <div className={style.attributePanel}>
      {renderAttributeList()}
    </div>
  )
}

export default (props: RouterTypes) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const store = { state, dispatch }
  const queryString = JSON.stringify(state.componentList)
  const preview = () => props.history.push(`/cms/preview?previewData=${queryString}`, state.componentList)
  return (
    <ComponentCtx.Provider value={store}>
      <ContainerWrapper />
      <DemoSidebar />
      <AttributePanel />
      <div>
        <button onClick={preview}>去预览吧</button>
      </div>
    </ComponentCtx.Provider>
  )
}

// TODO:FIX drop 时，组件放置会发生偏移：因为 drop 的放置点是鼠标当前的位置，但组件的左上角会移动但该放置点上

import React, {
  useContext,
  createContext,
  useRef,
  useReducer,
  useMemo
} from 'react'
import C1 from '../components/cms1'
import C2 from '../components/cms2'
import style from './cms.css'

// types
export interface ComponentItem {
  index?: number,
  offsetX?: number,
  offsetY?: number,
  choiceComponent?: Function,
  type: number,
  x: number,
  y: number
}
type State = {
  componentList: ComponentItem[],
  index: number
}
type Action = {
  type: string,
  data: object
}

// store
const initialState: State = {
  componentList: [],
  index: -1
}
const reducer = (state: State, action: Action) => {
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
        index: data.index,
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
          choiceComponent: (index: number, dispatch: any) => {
            dispatch({
              type: 'changeFocus',
              data: { index }
            })
          }
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
export const ComponentCtx: any = createContext({
  state: initialState,
  dispatch: () => {}
})

// 编辑器主题内容区
const Container = () => {
  // TODO 容器的 drop 应该限定事件类型，对新增或者修改作不同方式的处理
  const { state, dispatch } = useContext(ComponentCtx)
  const container: any = useRef()
  const allowDrop = (e: React.DragEvent) => e.preventDefault()
  const dropHandler = (e: React.DragEvent) => {
    const { pageX, pageY } = e
    const { x, y } = container.current.getBoundingClientRect()
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
        {renderComponents(state.componentList)}
      </div>
    </>
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
    const dragTarget = e.target as any
    const { x, y } = dragTarget.getBoundingClientRect()
    const [ offsetX, offsetY ] = [ e.pageX - x, e.pageY - y ]
    const data = {
      type: +dragTarget.getAttribute('data-type'),
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
    </div>
  )
}

// 组件属性栏
const AttributePanel = () => {
  const { state, dispatch }: any = useContext(ComponentCtx)
  if (state.componentList.length === 0) return <div>还没组件了</div>
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

export default () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const props = { state, dispatch }
  return (
    <ComponentCtx.Provider value={props}>
      <ContainerWrapper />
      <DemoSidebar />
      <AttributePanel />
    </ComponentCtx.Provider>
  )
}

// TODO:FIX drop 时，组件放置会发生偏移：因为 drop 的放置点是鼠标当前的位置，但组件的左上角会移动但该放置点上

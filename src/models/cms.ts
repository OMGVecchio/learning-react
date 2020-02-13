import { ModelType, State, Action } from './cms.d'

const CmsModel: ModelType = {
  namespace: 'cms',
  state: {
    componentList: [],
    index: -1
  },
  effects: {
    *add(action: Action, { put }) {
      yield put({
        type: 'addComponent',
        data: action.data
      })
    },
    *modify(action: Action, { put }) {
      yield put({
        type: 'modifyComponent',
        data: action.data
      })
    },
    *changeFocus(action: Action, { put }) {
      yield put({
        type: 'changeComponentFocus',
        data: action.data
      })
    }
  },
  reducers: {
    addComponent(state: State, action: Action): State {
      const { componentList } = state
      const { data } = action
      return {
        ...state,
        index: componentList.length,
        componentList: componentList.concat({
          type: data.type,
          x: data.x,
          y: data.y,
          index: componentList.length,
          style: {}
        })
      }
    },
    modifyComponent(state: State, action: Action): State {
      const { componentList } = state
      const { data: componentItem } = action
      // TODO 数据更新的问题，假如直接不能通过 index 更新数据，不如新增时创建一个 id？或者采用 immutable？
      componentList[state.index] = componentItem
      return {
        ...state,
        componentList: componentList
      }
    },
    changeComponentFocus(state: State, action: Action): State {
      const { componentList } = state
      const { data } = action
      return {
        ...state,
        index: data.index
      }
    }
  }
}

export default CmsModel

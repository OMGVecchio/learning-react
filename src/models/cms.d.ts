import { Reducer, Dispatch } from 'redux'
import { Effect } from 'dva'

export type State = {
  componentList: ComponentItem[],
  index: number
}

export type Action = {
  type: string,
  data: any
}

export interface ComponentItem {
  index: number,
  offsetX?: number,
  offsetY?: number,
  type: string,
  x: number,
  y: number,
  // any 应该具体话
  style: any
}

export interface CommonProps {
  cms: State,
  dispatch: Dispatch
}

export interface ComponentProps extends CommonProps {
  componentItem: ComponentItem,
  index: number
}

export interface ModelType {
  namespace: string,
  state: State,
  effects: {
    add: Effect,
    modify: Effect,
    changeFocus: Effect,
    undo: Effect,
    redo: Effect,
  },
  reducers: {
    add: Reducer<State>,
    modify: Reducer<State>,
    changeFocus: Reducer<State>,
    undo: Reducer<State>,
    redo: Reducer<State>,
  }
}

export type ConnectProps = {
  cms: ModelType
}

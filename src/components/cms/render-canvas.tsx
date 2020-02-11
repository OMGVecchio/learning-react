import { ComponentItem } from '@/models/cms.d'

import createComponent from './create-component'

// TODO 组件的展现形式：通过数据驱动，在主容器内循环所有的操作逻辑进行渲染？
// TODO 组件的公共特性：mixin 不易管理，hoc 感觉比较冗余，使用 renderProps 不如 用 hook 试试？
const renderCanavs = (componentList: ComponentItem[]) => {
  return componentList.map(componentItem => createComponent(componentItem))
}

export default renderCanavs

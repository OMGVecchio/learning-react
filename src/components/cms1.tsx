import React from 'react'

import CommonCms from './cms'

export default (componentItem: ICms.ComponentItem) => {
  // 假如仅是这种程度的逻辑复用，class 组件也能实现吧？
  const [ props ] = CommonCms(componentItem)
  return (
    <div {...props}>
      cms1 component
    </div>
  )
}

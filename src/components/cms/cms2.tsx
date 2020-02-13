import React from 'react'
import { connect } from 'dva'
import { ConnectProps, ComponentProps } from '@/models/cms.d'
import { Input } from 'antd'

import useComponentModify from './use-component-modify'
import useComponentStyle from './use-component-style'

const CMS1 = (componentProps: ComponentProps) => {
  // 假如仅是这种程度的逻辑复用，class 组件也能实现吧？
  const [ props ] = useComponentModify(componentProps)
  useComponentStyle(componentProps.index, componentProps.componentItem.style)
  console.log()
  return (
    <div {...props}>
      <Input.Search />
    </div>
  )
}

export default connect(({ cms } : ConnectProps) => ({ cms }))(CMS1)

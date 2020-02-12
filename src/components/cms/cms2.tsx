import React from 'react'
import { connect } from 'dva'
import { ConnectProps, ComponentProps } from '@/models/cms.d'

import useComponentModify from './use-component-modify'

const CMS1 = (componentProps: ComponentProps) => {
  // 假如仅是这种程度的逻辑复用，class 组件也能实现吧？
  const [ props ] = useComponentModify(componentProps)
  return (
    <div {...props}>
      cms2 component
    </div>
  )
}

export default connect(({ cms } : ConnectProps) => ({ cms }))(CMS1)

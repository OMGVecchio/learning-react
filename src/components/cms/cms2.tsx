import React from 'react'
import { connect } from 'dva'
import { ConnectProps, ComponentProps } from '@/models/cms.d'

import useComponent from './use-component'

const CMS1 = (componentProps: ComponentProps) => {
  // 假如仅是这种程度的逻辑复用，class 组件也能实现吧？
  const [ props ] = useComponent(componentProps)
  return (
    <div {...props}>
      cms2 component
    </div>
  )
}

export default connect(({ cms } : ConnectProps) => ({ cms }))(CMS1)

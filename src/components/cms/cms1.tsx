import React from 'react'
import { connect } from 'dva'
import { ConnectProps, ComponentProps } from '@/models/cms.d'
import { Select } from 'antd'

import useComponentModify from './use-component-modify'

const CMS1 = (componentProps: ComponentProps) => {
  // 假如仅是这种程度的逻辑复用，class 组件也能实现吧？
  const [ props ] = useComponentModify(componentProps)
  const a = [{
    id: 1,
    value: '1'
  }, {
    id: 2,
    value: '2'
  }]
  const renderOptions = () => a.map(item => (
    <Select.Option value={item.id} key={item.id}>
      {item.value}
    </Select.Option>
  ))
  return (
    <div {...props}>
      <Select defaultValue={'1'}>
        {renderOptions()}
      </Select>
    </div>
  )
}

export default connect(({ cms } : ConnectProps) => ({ cms }))(CMS1)

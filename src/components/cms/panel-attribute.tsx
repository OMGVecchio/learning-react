import React from 'react'
import { connect } from 'dva'
import { ConnectProps, CommonProps } from '@/models/cms.d'
import { Input } from 'antd'

import style from '../../pages/cms/index.css'

// 组件属性栏
const AttributePanel = ({
  cms,
  dispatch
}: CommonProps) => {
  // TODO 属性面板怎么来设计最合理？每个组件配置一个属性 config 列表参数，可继承并 disable 一些公共配置？
  const modifyStyle = (newValue: React.ChangeEvent<HTMLInputElement> )=> {
    const color = newValue.target.value
    const newComponent = cms.componentList[cms.index]
    newComponent.style.color = {
      tag: '.ant-input',
      value: color
    }
    dispatch({
      type: 'cms/modify',
      data: newComponent
    })
  }
  const renderAttributeList = () => {
    if (cms.index === -1) {
      return
    }
    const styleProps = cms.componentList[cms.index]
    return (
      <div>
        <p>
          x：{styleProps.x}
        </p>
        <p>
          y：{styleProps.y}
        </p>
        <p>
          字体颜色：
          <Input
            value={styleProps.style.color && styleProps.style.color.value}
            onChange={modifyStyle}
          />
        </p>
      </div>
    )
  }
  return (
    <div className={style.attributePanel}>
      {renderAttributeList()}
    </div>
  )
}

export default connect(({ cms }: ConnectProps) => ({ cms }))(AttributePanel)

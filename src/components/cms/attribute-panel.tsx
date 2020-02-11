import React from 'react'
import { connect } from 'dva'
import { ConnectProps, CommonProps } from '@/models/cms.d'

import style from '../../pages/cms/index.css'

// 组件属性栏
const AttributePanel = ({
  cms,
  dispatch
}: CommonProps) => {
  // TODO 属性面板怎么来设计最合理？每个组件配置一个属性 config 列表参数，可继承并 disable 一些公共配置？
  const renderAttributeList = () => {
    return (
      <div>
        {cms.index !== -1 && cms.componentList[cms.index].x}
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

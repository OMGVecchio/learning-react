import React from 'react'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { ConnectProps, CommonProps } from '@/models/cms.d'
import style from '@/pages/cms/index.css'

import AttributeBasic from './basic'
import AttribuetEvent from './event'

const { TabPane } = Tabs

// 组件属性栏
const AttributePanel = ({
  cms,
  dispatch
}: CommonProps) => {
  const renderAttributePanel = () => {
    if (cms.index === -1) {
      return '未选择组件'
    }
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="基础属性" key="1">
          <AttributeBasic />
        </TabPane>
        <TabPane tab="数据校验" key="2">
          数据校验
        </TabPane>
        <TabPane tab="事件配置" key="3">
          <AttribuetEvent />
        </TabPane>
      </Tabs>
    )
  }
  return (
    <div className={style.attributePanel}>
      {renderAttributePanel()}
    </div>
  )
}

export default connect(({ cms }: ConnectProps) => ({ cms }))(AttributePanel)

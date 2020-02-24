import React from 'react'
import { Tabs } from 'antd'
import style from '@/pages/cms/index.css'

import ComponentDemoList from './component'

const { TabPane } = Tabs

const SidebarPanel = () => {
  return (
    <Tabs defaultActiveKey="1" type="card" className={style.demoSidebar}>
      <TabPane tab="组件库" key="1">
        <ComponentDemoList />
      </TabPane>
      <TabPane tab="数据源" key="2">
        数据源
      </TabPane>
    </Tabs>
  )
}

export default SidebarPanel

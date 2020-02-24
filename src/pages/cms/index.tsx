import React from 'react'
import { Link } from 'umi'
import PanelHeader from '@/components/cms/panel-shortcut'
import PanelCanvas from '@/components/cms/panel-canvas'
import PanelSidebar from '@/components/cms/panel-sidebar/index'
import PanelAttribute from '@/components/cms/panel-attribute/index'

import style from './index.css'

export default () => {
  return (
    <>
      {/* <PanelHeader /> */}
      <div className={style.wrapper}>
        <PanelSidebar />
        <PanelCanvas />
        <PanelAttribute />
      </div>
      <Link to="/cms/preview">
        预览一下吧~~~
      </Link>
    </>
  )
}

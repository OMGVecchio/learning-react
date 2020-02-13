import React from 'react'
import { Link } from 'umi'
import PanelCanvas from '@/components/cms/panel-canvas'
import PanelSidebar from '@/components/cms/panel-sidebar'
import PanelAttribute from '@/components/cms/panel-attribute'

import style from './index.css'

export default () => {
  return (
    <>
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

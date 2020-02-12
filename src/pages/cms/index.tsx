import React from 'react'
import { Link } from 'umi'
import PanelCanvas from '@/components/cms/panel-canvas'
import PanelSidebar from '@/components/cms/panel-sidebar'
import PanelAttribute from '@/components/cms/panel-attribute'

export default () => {
  return (
    <>
      <PanelCanvas />
      <PanelSidebar />
      <PanelAttribute />
      <Link to="/cms/preview">
        预览一下吧~~~
      </Link>
    </>
  )
}

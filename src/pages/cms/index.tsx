import React from 'react'
import { Link } from 'umi'
import CanvasContainer from '@/components/cms/canvas-container'
import DemoSidebar from '@/components/cms/demo-sidebar'
import AttributePanel from '@/components/cms/attribute-panel'

export default () => {
  return (
    <>
      <CanvasContainer />
      <DemoSidebar />
      <AttributePanel />
      <Link to="/cms/preview">
        预览一下吧~~~
      </Link>
    </>
  )
}

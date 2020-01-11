import React from 'react'

import { ComponentItem } from '../pages/cms'
import CommonCms from './cms'

export default (componentItem: ComponentItem) => {
  const [ props ] = CommonCms(componentItem)
  return (
    <div {...props}>
      cms1 component
    </div>
  )
}

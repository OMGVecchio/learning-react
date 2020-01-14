import React from 'react'

import CommonCms from './cms'

export default (componentItem: ICms.ComponentItem) => {
  const [ props ] = CommonCms(componentItem)
  return (
    <div {...props}>
      cms2 component
    </div>
  )
}

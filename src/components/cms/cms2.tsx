import React from 'react'

import { useComponent } from './use-component'

export default (componentItem: ICms.ComponentItem) => {
  const [ props ] = useComponent(componentItem)
  return (
    <div {...props}>
      cms2 component
    </div>
  )
}

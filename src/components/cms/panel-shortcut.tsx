import React from 'react'
import { connect } from 'dva'
import { CommonProps, ConnectProps } from '@/models/cms.d'

import { Button } from 'antd'

const PanelShortcut = ({
  cms,
  dispatch
}: CommonProps) => {
  const undo = () => dispatch({ type: 'cms/undo' })
  const redo = () => dispatch({ type: 'cms/redo' })
  return (
    <div>
      <Button onClick={undo}>
        撤回
      </Button>
      <Button onClick={redo}>
        重做
      </Button>
    </div>
  )
}

export default connect(({ cms }: ConnectProps) => ({ cms }))(PanelShortcut)

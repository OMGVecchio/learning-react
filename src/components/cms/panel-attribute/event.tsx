import React, { useState } from 'react'
import { List, Button } from 'antd'

import EventModal from './index'

const { Item } = List

const EventAttribute = () => {
  const [ modalVisibility, setModalVisibility ] = useState(false)
  const openModal = () => setModalVisibility(true)
  const closeModal = () => setModalVisibility(false)
  return (
    <>
      <List>
        <Item>
          初始化控件
          <Button onClick={(openModal)}>
            设置
          </Button>
        </Item>
      </List>
      <EventModal
        visible={modalVisibility}
        onOk={closeModal}
        onCancel={closeModal}
      />
    </>
  )
}

export default EventAttribute

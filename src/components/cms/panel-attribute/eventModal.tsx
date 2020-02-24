import React from 'react'
import { Modal } from 'antd'

interface IProps {
  visible: boolean,
  onOk: any,
  onCancel: any
}

const EventModal: React.FC<IProps> = ({
  visible,
  onOk,
  onCancel
}) => {
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      asd
    </Modal>
  )
}

export default EventModal

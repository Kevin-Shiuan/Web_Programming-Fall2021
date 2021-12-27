import React from 'react';
import { Modal } from 'antd';

function Dialog({ modal, closeDialog }){
  
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleOk = () => {
    closeDialog(false);
  };

  const handleCancel = () => {
    closeDialog(false);
  };

  return (
      <Modal title="Basic Modal" visible={modal} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  );
};

export default Dialog
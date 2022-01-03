import React, { useState } from 'react';
import { Modal, Input } from 'antd';

//todo import textfield and set onchange, update to name via setName

function ChatModal({ modalVisibility, username, handleCreate, handleCancel}){

  const [name, setName]=useState("")

  return (
      <Modal visible={modalVisibility} onOk={()=>{handleCreate(username, name)}} onCancel={()=>{handleCancel()}}>
        <p>Enter reciever name</p>
        <Input
          placeholder="Type name here..."
          onChange={(e) => setName(e.target.value)}
        />


      </Modal>
  );
};

export default ChatModal
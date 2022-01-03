import {useState} from "react"
import { useMutation } from "@apollo/client"
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from "../graphql"
// import styled from 'styled-components'
import { Button, Input, Tabs, Tag } from 'antd'
import Title from '../components/Title'
import H1 from '../components/H1'
import TabBar from './TabBar'
import ChatBox from './ChatBox'
import ChatModal from './ChatModal'
import useChatBox from '../hooks/useChatBox'
// import Message from '../components/Message'


function ChatRoom({username, displayStatus}){
  const [messageInput, setMessaeInput] = useState("")
  const [activeKey, setActiveKey]=useState("")
  const {chatBoxes, createChatBox, removeChatBox}=useChatBox()
  const [modalVisibility, setModalVisibility] = useState(false);

  const [startChat]=useMutation(CREATE_CHATBOX_MUTATION)
  const [sendMessage]=useMutation(CREATE_MESSAGE_MUTATION)

  const addChatBox=()=>{
    setModalVisibility(true);
  }

  return(
    <>
      <Title>
        <H1>{username}'s Chat</H1>
        {/* <Button type="primary" danger onClick={clearMessages}>Clear</Button> */}
      </Title>
      <TabBar 
        username={username} 
        activeKey={activeKey} 
        setActiveKey={setActiveKey} 
        chatBoxes={chatBoxes} 
        addChatBox={addChatBox} 
        removeChatBox={removeChatBox}
      />
      <ChatModal 
        modalVisibility={modalVisibility} 
        username={username}
        handleCreate={async(username, name)=>{
          console.log(username + name)
          await startChat({
            variables: {
              name1: username,
              name2: name,
            },
          });
          setActiveKey(createChatBox(name));
          setModalVisibility(false);
        }}
        handleCancel={()=>{
          setModalVisibility(false);
        }}
      />
      {/* <ChatBox username={username} /> */}
      <Input.Search
        // ref={bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        value={messageInput}
        onChange={(e) => setMessaeInput(e.target.value)}
        onSearch={(msg) => {
           
        if (!msg) {
          displayStatus({
            type: 'error',
            msg: 'Please enter message.'
          })
        return
        }
          sendMessage({ name: username, body: msg })
          setMessaeInput('')
        }}
      />
    </>
  )
}

export default ChatRoom

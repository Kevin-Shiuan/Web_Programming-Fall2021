import { Button, Input, message, Tag } from 'antd'
import useChat from '../hooks/useChat'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import Message from '../components/Message'
import H1 from '../components/H1'
import SignIn from './SignIn'

//remember user
const LOCALSTORAGE_KEY = "save-me";

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`
const Self = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
`

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe||'')
  const [signedIn, setSignedIn] = useState(false)

  //ws connection
  // const client = new WebSocket('ws://localhost:4000')
  // client.onopen = () => {
  //   console.log('WebSocket Client Connected');
  // };

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = { content: msg, duration: 3 }
      switch(type){
        case'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content)
          break;
      }
    }
  }

  const bodyRef = useRef(null)

  useEffect(()=>{
    displayStatus(status)
  }, 
    [status]
  )
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
      setUsername(me);
      bodyRef.current.focus()
    }
  }, [signedIn, me]);

  return (
    signedIn?
    <AppDiv>
      <Title>
        <H1>Simple Chat</H1>
        <Button type="primary" danger onClick={clearMessages}>Clear</Button>
      </Title>
      <Message>
        {messages.length === 0 ? 
          (<p style={{ color: '#ccc' }}> No messages... </p>):
          (messages.map(({ name, body }, i) => (
            (name === username)?
            <Self>
              <p key={i}>
                {body}  <Tag color="blue" >{name}</Tag>
              </p>
            </Self>
            :
            <div>
              <p key={i}>
                <Tag color="blue">{name}</Tag> {body}
              </p>
            </div>
            )
          ))}
      </Message>
      <Input
        placeholder="Username"
        style={{ marginBottom: 10 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
        }}}
      ></Input>
      <Input.Search
        ref={bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
           
        if (!msg || !username) {
          displayStatus({
            type: 'error',
            msg: 'Please enter a username and a message body.'
          })
        return
        }
          sendMessage({ name: username, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </AppDiv>
    :
    <AppDiv><SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} /></AppDiv>
  )
}

export default App

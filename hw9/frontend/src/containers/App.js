import { Button, Input, message } from 'antd'
// import useChat from '../hooks/useChat'
import { useEffect, useRef, useState } from 'react'
import Title from '../components/Title'
import H1 from '../components/H1'
import SignIn from './SignIn'
import ChatRoom from './Chatroom'
import AppDiv from '../components/Appdiv'
// import TabBar from './TabBar'
// import Dialog from './ChatModal';

//remember user
const LOCALSTORAGE_KEY = "save-me";

function App() {
  // const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe||'')
  const [signedIn, setSignedIn] = useState(false)
  // const [activeTabKey, setActiveTabKey]=useState(0);
  // const [plane, setPlane]=useState([
  //   { title: 'Tab 1', content: 'Content of Tab 1' },
  //   { title: 'Tab 2', content: 'Content of Tab 2' },
  //   { title: 'Tab 3', content: 'Content of Tab 3' },
  // ]);
  const [modal, setModal] = useState(false);

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

  // const bodyRef = useRef(null)

  const openDialog = ()=>{
    setModal(true);
  }
  const closeDialog = ()=>{
    setModal(false);
  }

  // useEffect(()=>{
  //   displayStatus(status)
  // }, 
  //   [status]
  // )
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
      setUsername(me);
      // bodyRef.current.focus()
    }
  }, [signedIn, me]);

  return (
    signedIn?
    <AppDiv>
      {/* <Title>
        <H1>Simple Chat</H1>
      </Title> */}
      {/* <TabBar setActiveTabKey={setActiveTabKey} plane={plane} setPlane={setPlane} modal={modal} openDialog={openDialog} closeDialog={closeDialog}/> */}
      <ChatRoom username={username} displayStatus={displayStatus}/>

      {/* <Input.Search
        // ref={bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
           
        // if (!msg || !username) {
        //   displayStatus({
        //     type: 'error',
        //     msg: 'Please enter a username and a message body.'
        //   })
        // return
        // }
        //   sendMessage({ name: username, body: msg })
        //   setBody('')
        }}
      ></Input.Search> */}
    </AppDiv>
    :
    <AppDiv><SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} /></AppDiv>
  )
}

export default App

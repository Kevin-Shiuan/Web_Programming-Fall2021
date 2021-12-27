import styled from 'styled-components'
import { Tag } from 'antd'
import Message from '../components/Message'

const Chatbox = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`
function ChatRoom({username, messages}){
  return(
    <Chatbox>
      {messages.length === 0 ? 
            (<p style={{ color: '#ccc' }}> No messages... </p>):
            (messages.map(({ name, body }, i) => (
              (name === username)?
              <Message key={i}>
                <p>
                  {body}  <Tag color="blue" >{name}</Tag>
                </p>
              </Message>
              :
              <div key={i}>
                <p>
                  <Tag color="blue">{name}</Tag> {body}
                </p>
              </div>
              )
            ))}
    </Chatbox>
  )
}

export default ChatRoom
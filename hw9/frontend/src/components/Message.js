import styled from 'styled-components'

const StyledMessage = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: ${(p)=>(p.isMe?'row-reverse':'row')};
  margin: 8px 0;

  & p:first-child{
    margin: 0 5px;
  }
  & p:last-child{
    padding: 2px px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
  }
  & 
`
const Message=({username, name, body})=>{
  return(
    <StyledMessage isMe={username===name}>
      <p>{name}</p>
      <p>{body}</p>
    </StyledMessage>
  )
} 
export default Message
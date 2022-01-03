import Message from "../components/Message";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";

const Messages = styled.div`
    height: calc(240px - 36px) :
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const StyledChatbox = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`

const ChatBox = ({ username, friend, ...props }) => {
    const messagesFooter = useRef (null);
    const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables:{
            name1: username,
            name2: friend,
        },
    });
 
    const scrollToBottom = ()=>{
        messagesFooter.current?.scrollIntoView({ behavior:"smooth" });
    };

    useEffect(()=>{
        scrollToBottom();
    }, {data});

    useEffect(()=>{
        try{
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {from: username, to: friend},
                updateQuery:(prev, { subscriptionData })=>{
                    if(!subscriptionData.data) return prev
                    const newMessage = subscriptionData.data.message.message;
                    console.log(prev);

                    return{
                        ChatBox: {
                            messages: [...prev.chatBox.message, newMessage],
                        },
                    };
                },
            });
        } catch(e){}
    }, [subscribeToMore])

    if (loading) return <p>loading</p>;

    return(
        <StyledChatbox>
            <Messages>
                {data.chatBox.messages.map(({sender: {name}, body}, i)=>(
                    <Message username={username} name={name} body={body} key={name+body+i}/>

                ))}
                <div ref={messagesFooter} />
            </Messages>
        </StyledChatbox>
    )

}

export default ChatBox
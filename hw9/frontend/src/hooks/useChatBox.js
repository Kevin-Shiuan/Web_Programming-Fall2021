import { useState } from "react";

//ws connection
// const client = new WebSocket('ws://localhost:5500')
// client.onopen = () => {
//   console.log('WebSocket Client Connected');
// };

const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

//   client.onmessage = (byteString) => {
//     const { data } = byteString;
//     const [task, payload] = JSON.parse(data);
//     switch(task){
//       case "init": {
//         setMessages(() => payload);
//         break;
//       }
//       case "output":{
//         setMessages(() => [...messages, ...payload]); 
//         break;
//       }
//       case "status": {
//         setStatus(payload); 
//         break;
//       }
//       case "cleared": {
//         setMessages([]);
//         break;
//       }
//     default: break;
//     }
//   }

  const createChatBox = (friend) => { 
    if(chatBoxes.some((name)=>name===friend)){
      throw new Error(friend + "'s chatroom already opened.");
    }
    setChatBoxes([...chatBoxes, friend]);
    return friend;
  };
   
  const removeChatBox = (activeKey, targetKey) => {
    const index = chatBoxes.indexOf(activeKey);
    const newChatBoxes = chatBoxes.filter((name)=>name!=targetKey);
    setChatBoxes(newChatBoxes);

    return activeKey
      ? activeKey === targetKey
        ?index === 0
          ?''
          :chatBoxes[index-1]
        :activeKey
      :''
  };
   return {
    chatBoxes,
    createChatBox,
    removeChatBox,
    };
};

 export default useChatBox;
 
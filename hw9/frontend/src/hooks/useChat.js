import { useState } from "react";

//ws connection
const client = new WebSocket('ws://localhost:5500')
client.onopen = () => {
  console.log('WebSocket Client Connected');
};

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    switch(task){
      case "init": {
        setMessages(() => payload);
        break;
      }
      case "output":{
        setMessages(() => [...messages, ...payload]); 
        break;
      }
      case "status": {
        setStatus(payload); 
        break;
      }
      case "cleared": {
        setMessages([]);
        break;
      }
    default: break;
    }
  }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };

  const sendMessage = (payload) => { 
    sendData(["input", payload]); 
  };
   
  const clearMessages = () => {
    sendData(["clear"]);
  };
   return {
     status,
     messages,
     sendMessage,
     clearMessages
    };
};

 export default useChat;
 
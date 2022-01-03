import { makeName, checkUser, checkChatBox, newUser, newChatBox, checkMessage, newMessage } from './utility'

const Query = {
  async chatBox(parent, {name1, name2},{db}, info){
    let chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "query")
    console.log(chatBox);
    if(!chatBox){
      throw new Error("Chat Box not exist while query");
    }
    return chatBox;
  },
};

export default Query;

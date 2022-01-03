import { makeName, checkUser, checkChatBox, newUser, newChatBox, checkMessage, newMessage } from './utility'

const Subscription = {
  message: {
    async subscribe(parent, {from, to},{db, pubsub}, info){
      const chatBoxName = makeName(from, to);
      let chatBox = await checkChatBox(db, chatBoxName, "Subscription")
      if(!chatBox){
        throw new Error("Chat Box not exist while Subscription");
      }
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    }
  }
};

export default Subscription;

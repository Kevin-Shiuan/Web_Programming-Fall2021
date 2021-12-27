const ChatBox = {
    messages(parent, args, {db}, info){
      console.log(parent)
      return Promise.all(
        parent.messages.map((mId)=>db.MessageModel.findById(mId))
      )
    }
};

export default ChatBox
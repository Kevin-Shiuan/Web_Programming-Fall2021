import Message from './models/message.js';

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = (ws) => {
    Message.find().sort({ created_at: -1 }).limit(100).exec((err, res) => {
        if (err) throw err
        // initialize app with existing messages
        sendData(['init', res], ws)
  })}

export { sendData, sendStatus, initData }
import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import {WebSocketServer} from 'ws'
import http from 'http'
import Message from './models/message.js'
import { initData, sendData, sendStatus } from './wssConnect.js';

//connect to moongoDb
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection

const app = express()
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

//broadcast
const broadcastMessage = (data, status) => {
    wsServer.clients.forEach((client) => {
      sendData(data, client);
      if(status){
          sendStatus(status, client);
      }
    });
};

db.once('open', () => {
    console.log('MongoDB connected!')
    //connect to ws
    wsServer.on('connection', (ws)=>{
        console.log("new connection to ws!")
        initData(ws);
        ws.onmessage = async(byteString)=>{
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            switch (task){
                case 'input':{
                    const {name, body} = payload
                    // console.log(name)
                    // console.log(body)
                    const message = new Message({name,body})
                    try { 
                        await message.save();
                        // sendData(['output', [payload]], ws)
                        sendStatus({
                            type: 'success',
                            msg: 'Message sent.'
                            }, ws)
                        broadcastMessage(
                            ['output', [payload]],
                            {
                            // type: 'success',
                            // msg: 'Message sent.'
                            }
                        )
                    } 
                    catch (e) { 
                        console.log("Message DB save error: " + e);
                        console.log(e);
                        sendStatus({
                            type: 'error',
                            msg: 'Message DB save error'
                            }, ws)
                    }
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                    //   sendData(['cleared'], ws)
                    //   sendStatus({ type: 'info', msg: 'Message cache cleared.'}, ws)
                      broadcastMessage(
                        ['cleared'],
                        { type: 'info', msg: 'Message cache cleared.'}
                    )
                 })
                 break;
                }
                default: break
            }
        }
    })

    const PORT = process.env.PORT || 4000

    server.listen(PORT, function() {
        console.log(`Server listening on: ws://localhost:${PORT}`);
    });

})

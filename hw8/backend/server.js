import WebSocket from 'ws';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
// import dotenv from 'dotenv';
import dotenv from "dotenv-defaults";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));
// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// const db = mongoose.connection

 
// db.once('open', () => {
//     wss.on('connection', (ws) =>{
//         ws.onmessage = async (byteString) => {
//             await dbMessage.save();
//         }
//         sendData(['output', [payload]])
//     })
//       server.listen(PORT, )
//     })
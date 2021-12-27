import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import {WebSocketServer} from 'ws'
import http from 'http'

//connect to moongoDb
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection

const app = express()
const server = http.createServer(app);

db.once('open', () => {
    console.log('MongoDB connected!')

    const PORT = process.env.PORT || 4000

    server.listen(PORT, function() {
        console.log(`Server listening on: ws://localhost:${PORT}`);
    });

})

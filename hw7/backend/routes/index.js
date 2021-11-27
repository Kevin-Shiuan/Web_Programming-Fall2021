import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import scoreCard from '../models/ScoreCard.js';

//connect to moongoDb
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async(res) => {
    // await mongoose.connection.collection('scorecards').deleteMany({});
    console.log("mongo db connection created");
});

//set up body-parser
var jsonParser = bodyParser.json();
const Route = express.Router()

//some route for testing
Route.post('/test', jsonParser, (req, res) => {
    console.log(req.body.name);
    res.json({ msg: "Post test success!"});
})
//second route for testing
Route.post('/test-data', jsonParser, async(req, res) => {
    // const newData = scoreCard({name:req.body.name, subject:req.body.subject, score:req.body.score});
    // await newData.save();
    console.log(req.body);
    res.json({ msg: "Post test-data success!"});
})

//real route
Route.post('/create-card', jsonParser, async(req, res) => {
    let msg = "this is the msg";
    let success = false;
    const filter = { name : req.body.name, subject : req.body.subject};
    const update = { score: req.body.score };
    const options = { upsert: true, new: true, rawResult: true };

    // let exist = await scoreCard.findOneAndUpdate(filter, update, options);
    // if(exist) console.log(exist.value);

    try{
        // const newData = scoreCard({name:req.body.name, subject:req.body.subject, score:req.body.score});
        // await newData.save();
        // console.log("Card created");
        const exist = await scoreCard.findOneAndUpdate(filter, update, options);
        exist.lastErrorObject.updatedExisting?
        msg = `Updated (${exist.value.name}, ${exist.value.subject}, ${exist.value.score}) with new score =${exist.value.score}`:
        msg = `Added (${exist.value.name}, ${exist.value.subject}, ${exist.value.score})`;
        success = true;
        console.log(msg);
    }catch(e){
        console.log("Error while creating card");
        msg = e;
    }
    res.json({ message: msg, card: success });
})

Route.delete('/clear-db', async(_, res) => {
    let msg = "this is the msg";
    try{
        await mongoose.connection.collection('scorecards').deleteMany({});
        msg = "Database cleared";
        console.log("Database cleared");
    }
    catch(e){
        console.log("Error while clearing dataBase");
        msg = e;
    }
    res.json({ message: msg});
})

Route.get('/query-cards', async(req, res) => {
    let msg = [];
    let error;
    // console.log(req.query);
    const type = req.query.type;
    const input = req.query.input;
    const filter = JSON.parse(`{"${type}":"${input}"}`);
    // console.log(filter);
    error = `${type} (${input}) not found!`;

    try{
        let exist = await scoreCard.find(filter);
        // let msg = `Found (${exist.value.name}, ${exist.value.subject}, ${exist.value.score}), ${exist.value.score}`;
        // console.log(exist);
        exist.map( (r)=>{
            msg.push(`(${r.name}, ${r.subject}, ${r.score})`)
        } )
        // console.log(msg);
        console.log("query-cards success!");
    }
    catch(e){
        console.log("Error while getting from dataBase");
    }
    res.json({ messages: msg, message: error });
})

export default Route
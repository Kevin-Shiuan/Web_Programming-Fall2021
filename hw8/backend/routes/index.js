import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

//connect to moongoDb
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async(res) => {
    console.log("mongo db connection created");
})
.catch((e)=>{
    console.log(e)
});

//set up body-parser
var jsonParser = bodyParser.json();
const router = express.Router()

//some route for testing
router.post('/test', jsonParser, (req, res) => {
    console.log(req.body.name);
    res.json({ msg: "Post test success!"});
})
//second route for testing
router.post('/test-data', jsonParser, async(req, res) => {
    // const newData = scoreCard({name:req.body.name, subject:req.body.subject, score:req.body.score});
    // await newData.save();
    console.log(req.body);
    res.json({ msg: "Post test-data success!"});
})

export default router
import express from 'express'
import Post from '../models/post'
import moment from 'moment'
import bodyParser from 'body-parser'

const router = express.Router()

//set up body-parser
var jsonParser = bodyParser.json();
const Route = express.Router()


// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(_, res) => {
    let msg = "success"
    let status = 200
    let error = false
    let RawData = await Post.find({}, function(err, doc){
        if(doc.length === 0 || err){
            msg = "error"
            status = 403
            error = true
        }
    }).clone()
    if(error){
        RawData=null
    }
    else{
        RawData.sort( (a, b) =>{
            var indexA = a.timestamp; 
            var indexB = b.timestamp; 
            if (indexA < indexB) return 1;
            else return -1;
          })
    }
    res.status(status).send(res.json({
        "message": msg,
        "data": RawData
    }))
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async(req, res) => {
    let msg = "success"
    let status = 200
    let error = false

    const type = "postId";
    const input = req.query.pid;
    const filter = JSON.parse(`{"${type}":"${input}"}`);
    console.log(filter);

    let RawData = await Post.find(filter, function(err, doc){
        if(doc.length === 0 || err){
            msg = "error"
            status = 403
            error = true
        }
    }).clone()
    if(error){
        RawData=null
    }
    res.status(status).send(res.json({
        "message": msg,
        "data": RawData
    }))
    
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', jsonParser, async(req, res) => {
    // let msg = "error";
    // // let success = false;
    // // let rawData = [];
    // const filter = { postId : req.body.postId, title : req.body.title, content : req.body.content, timestamp : req.body.timestamp};
    // const update = { postId : req.body.postId, title : req.body.title, content : req.body.content, timestamp : req.body.timestamp};
    // const options = { upsert: true, new: true, rawResult: true };
    // const exist = await scoreCard.findOneAndUpdate(filter, update, options);
    //     exist.lastErrorObject.updatedExisting?
    //     msg = "update":
    //     msg = "success";
    const newPost = {
          postId: req.body.postId,
          title: req.body.title,
          content: req.body.content,
          timestamp: req.body.timestamp
        },


})

// TODO 5-(1): create the 4th API (/api/post)

export default router
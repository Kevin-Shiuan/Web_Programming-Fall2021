import express from 'express'
import { genNumber, getNumber } from '../core/getNumber.js'
const router = express.Router()

router.post('/start', (_, res) => {
    let num = genNumber();
    // console.log(num);
    res.json({ msg: 'The game has started.', number: num});
})

router.get('/guess', (req, res) => {
    const number = getNumber();
    // const guessed = roughScale(req.query.number, 10);
    const guessed = req.query.number
    let msg="";
    let win=false;
    const diff = number-guessed;
    // console.log(guessed);
    // console.log(number);

    // if (!(number-guessed)){
    //     msg="yes";
    // }
    // else
    //     msg = (guessed>number)?"Try smaller":"Try larger";
    if (guessed < 1 || guessed > 100) {
      res.status(406).send({ msg: "Error: "+guessed+" is not between 1~100" ,win: win})
    }
    else if(Math.abs(diff)<10 && Math.abs(diff)){
        msg=(diff>0)?"Slightly larger~":"Slightly smaller~";
    }
    else if(!diff){
        msg="You won! The number was "+number+"!";
        win=true;
    }
    else msg=(diff>0)?"Try larger":"Try smaller"
    res.json({ msg: msg, win: win});
})

router.post('/restart', (_, res) => {
    let num = genNumber();
    res.json({ msg: 'The game has restarted.', number: num});
})

export default router
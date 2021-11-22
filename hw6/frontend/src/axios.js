import axios from 'axios'

const instance=axios.create({ baseURL:"http://localhost:4000/guess"})

const startGame = async()=>{
    const{ data: {msg, number} }= await instance.post('/start')
    // console.log(msg)
    return {msg, number}
}

async function guess(number){
    let msg={};
    try{
        const get = await instance.get('/guess',{params: {number}});
        msg.data = get.data.msg;
        msg.state = get.data.win;
        // console.log(msg);
    }
    catch(e){
        msg.data = e.response.data.msg;
        msg.state = e.response.win;
        // console.log(msg);
    }  
    return msg
}
const restart = async()=>{
    const{ data: {msg, number} }= await instance.post('/restart')
    return {msg, number}
}
export { startGame, guess, restart }
let number

const getNumber = ()=>{
    return number
}
const genNumber =()=>{
    // if(!number){
        number = Math.floor(Math.random() * 100)
    // }
    return number
}

export{getNumber, genNumber}
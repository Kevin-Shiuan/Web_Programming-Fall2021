// import React from 'react;

import { useState } from "react"
import MyButton from "../components/MyButton";
import Game from "./Game";
import { startGame }from '../axios';

export default function NumberGuessingGame(){
    
    const [start, setStart]=useState(false);

    const onClickedFunction=async()=>{
        setStart(!start);
        let temp = await startGame();
        console.log(temp.msg+" "+temp.number);
    }

    return(
    <div className="Game">
        {start?<Game/>:<MyButton displayText="Start Game" variant="contained" size="large" onClickedFunction={()=>onClickedFunction()}/>}
    </div>
    )
}
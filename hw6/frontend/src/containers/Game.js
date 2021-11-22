import { useState } from "react";
import MyButton from "../components/MyButton";
import MyTextField from "../components/MyTextFields";
import { guess, restart }from '../axios';

export default function Game(){
    const [win, setWin]=useState(false);
    const [number, setNumber]=useState();
    const [result, setResult]=useState("Just give it a try! I will give you hint!");
    const [invalidInput, setInvalidInput]=useState(false);

    const checkInput=(num)=>{
        if(Number(num) || num==="0"){
            setNumber(num);
            setInvalidInput(false);
        }
        else setInvalidInput(true);
    }
    // const processGuessByBackend = async(num)=>{
    //     return await guess(num);
    // }
    const handleGuess = async ()=>{
        const response = await guess(number);
        // console.log(response);
        setWin(response.state);
        // console.log(response.state?"win":"nope");
        setResult(response.data);
    }

    const handleRestart = async()=>{
        setWin(false);
        setNumber();
        let temp = await restart();
        console.log(temp.msg+" "+temp.number);
        setResult(temp.msg);
    }
    return(
    <div>
            {!win? 
                <div>
                    <div className="inlineTxt">Guess a number between 1 to 100!</div>
                    <div className="actionWrapper">
                        <div className="mainInput">
                            <MyTextField onchangeFunction={checkInput} invalid={invalidInput}/>
                            <div className="buttonWrapper">
                                <MyButton displayText="Guess!" size="large" disable={invalidInput} onClickedFunction={()=>handleGuess()}/>
                            </div>
                        </div>
                        {/* <div className="secondaryInput">
                            <MyButton displayText="-10"/>
                            <MyButton displayText="+10"/>
                        </div> */}
                        <div className="inlineTxt">{result}</div>
                    </div>
                </div>:
                <div className="result">
                    <div className="inlineTxt">{result}</div>
                    <MyButton displayText="Restart" size="large" onClickedFunction={()=>handleRestart()}/>
                </div>
            }
        
    </div>
    )
}
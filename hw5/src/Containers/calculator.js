import React, {useEffect, useState, Component}  from 'react';
import Button from '../Components/button';
import PrimaryText from '../Components/primaryText';

function Calculator() {
    const[Input,setInput]=useState("");
    const[String,setString]=useState("test")
    const getInput = (input)=>{
        setString(input);
    }
    const btn=[
        ['C','±','d','÷'],
        ['7','8','9','x'],
        ['4','5','6','-'],
        ['1','2','3','+'],
        ['0','.','='],
    ];

    return (
        <div id="calculatorWrapper">
            <div id="screenWrapper">
                <h3 id="secondaryText">1+1</h3>
                <PrimaryText value={String}/>
            </div>
            {btn.map( (r)=> <div className="row">{
                    r.map( (c)=> <Button name={c} sendInput={getInput} key={c} /> )
                }
            </div>) }ç
        </div>
    )
}



export default Calculator;
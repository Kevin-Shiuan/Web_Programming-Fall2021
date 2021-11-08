import React, {useEffect, useState}  from 'react';
import Button from '../Components/button';
import PrimaryText from '../Components/primaryText';
import SecondaryText from '../Components/secondaryText';

function Calculator() {
    const[Input,setInput]=useState(null);
    const[Result,setResult]=useState(null);
    const[String,setString]=useState(null);
    const[Buffer,setBuffer]=useState(null);
    const[Equation,setEquation]=useState("");// eval("3+26*54/32")
    const getInput = (input)=>{
        // setInput(input);
        switch (input){
            case 'C':
                setResult(null);
                setString(null);
                setEquation(null);
                setInput(null);
                setBuffer(null);
                break;
            case '±':
                break;
            case 'd':
                setString(String?String.slice(0, -1):null);
                setEquation(Equation?Equation.slice(0, -1):null);
                break;
            case '+':
                setString(String?(String+input): null );
                setEquation(Equation?(Equation+'+'): (Result?Result+'+':null) );
                break;
            case '-':
                setString(String?(String+input): null );
                setEquation(Equation?(Equation+'-'): (Result?Result+'-':null) );
                break;
            case '÷':
                setString(String?(String+input): null );
                setEquation(Equation?(Equation+'/'): (Result?Result+'/':null) );
                break;
            case 'x':
                setString(String?(String+input): null );
                setEquation(Equation?(Equation+'*'): (Result?Result+'*':null) );
                break;
            case '=':
                setBuffer(String);
                setResult(eval(Equation));
                setString(eval(Equation));
                console.log("Equation= "+Equation);
                console.log("String= "+String);
                break;               
            default:
                setString(String?(String+input):input);
                setEquation(Equation?(Equation+input):input);
        }
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
                <SecondaryText value={Buffer} />
                <PrimaryText value={String}/>
            </div>
            {btn.map( (r)=> <div className="row">{
                    r.map( (c)=> <Button name={c} sendInput={getInput} key={c} /> )
                }
            </div>) }
        </div>
    )
}



export default Calculator;
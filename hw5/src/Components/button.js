import React from 'react';
import {ReactComponent as Delete} from '../delete.svg';

function Button(props){
        // return(
        //     <div className="buttonWrapper" id="primary">
        //         <input className="button" type="button" value={props.name} id="primary" onClick={()=>{props.sendInput(props.name)}}></input>
        //     </div>
        // )
    switch(props.name){
        case("="):
            return(
                <div className="buttonWrapper" id="primary">
                    <input className="button" type="button" value={props.name} id="primary" onClick={ ()=>{props.sendInput(props.name) }} ></input>
                </div>
            )
        case("d"):
        const icon=(
            <i className="icon">
                <img src={Delete} />
            </i>
        );
            return(
                <div className="buttonWrapper">
                    <div className="button" onClick={ ()=>{props.sendInput(props.name);}}>
                        <Delete className="iconButton" type="button" />
                    </div>
                </div>
            )
        default:
            return(
                <div className="buttonWrapper">
                    <input className="button" type="button" value={props.name} onClick={ ()=>{props.sendInput(props.name) }} ></input>
                </div>
            )
    }
    
}

export default Button
import React from 'react';

function Button(props){
        // return(
        //     <div className="buttonWrapper" id="primary">
        //         <input className="button" type="button" value={props.name} id="primary" onClick={()=>{props.sendInput(props.name)}}></input>
        //     </div>
        // )
    return(
        <div className="buttonWrapper">
            <input className="button" type="button" value={props.name} onClick={ ()=>{props.sendInput(props.name) }} ></input>
        </div>
    )
}

export default Button
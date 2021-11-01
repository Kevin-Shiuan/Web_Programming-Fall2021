import React from 'react';
import itemX from '../img/x.png';

class ToDoAppItemX extends React.Component{
    constructor(props){
        super(props);
        this.state={
            done: false,
            visiblity: true,
        }
    }
    render(){
        return(
            <img src={itemX} alt="itemX" className="todo-app__item-x" />
        )
    }
}

export default ToDoAppItemX;
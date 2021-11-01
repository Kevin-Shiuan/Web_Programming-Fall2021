import React from 'react';
import ToDoAppCheckBox from './todo-app__checkbox';
import ToDoAppItemX from './todo-app__item-x';

class ToDoAppItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: props.name,
            index: props.index,
            done: false,
            visiblity: true,
        }
    }
    GetCheckState = (Check)=>{
        this.setState({done:Check});
        this.props.SendItemDoneState(Check);
    }

    render(){
        return(
            <li className="todo-app__item">
                <ToDoAppCheckBox index={this.state.index} SendCheckState={this.GetCheckState}/>
                <h1 className={ this.state.done? "todo-app__item-detail done":"todo-app__item-detail"}>{this.state.name}</h1>
                <ToDoAppItemX />
            </li>
        )
    }

}

export default ToDoAppItem;
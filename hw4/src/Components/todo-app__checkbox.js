import React from 'react';

class ToDoAppCheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            done: false,
            index: props.index,
        }
    }
    // UpdateDone = (e) => this.setState( ()=>({done: e.target.checked}));
    UpdateCheckState = (e)=>{
        this.setState( ()=>({done: e.target.checked}) );
        // console.log(this.state.index + " "+this.state.done+" "+e.target.checked);
        this.props.SendCheckState(e.target.checked);
    }

    render(){
        // {console.log(this.state.index+" "+this.state.done);}
        return(
            <div className="todo-app__checkbox">
                <input type="checkbox" id={this.state.index} onChange={this.UpdateCheckState}/>
                <label htmlFor={this.state.index}>
            </label></div>
        )
    }
}

export default ToDoAppCheckBox;
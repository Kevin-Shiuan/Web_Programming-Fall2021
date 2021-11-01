import React from 'react';

class UserInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: "",
            placeholder: "What needs to be done?",
            className: "todo-app__input",
        }
    }
    handleKeyDown = (e)=>{
        if (e.keyCode === 13 && e.target.value ){
            console.log(e.target.value);
            this.props.getInput(e.target.value);
            this.setState( {value: ""} );
        }
    }
    update = (e)=>this.setState( ()=>( {value:e.target.value} ) );

    render(){
        return(
            <input 
            className={this.state.className} 
            placeholder={this.state.placeholder} 
            value={this.state.value}
            // onChange={ (e) => this.setState( {value: e.target.value} ) }
            onChange={ this.update }
            onKeyDown={ this.handleKeyDown }
            ></input>
        )
    }
}

export default UserInput;




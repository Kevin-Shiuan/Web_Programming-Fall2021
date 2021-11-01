import React, { useState, }  from 'react';
import UserInput from '../Components/todo-app__input';
import ToDoAppList from './todo-app__list';

function TodoAppMain(){
    const [data, SetData] = useState([]);
    // const [ToDo, SetToDo] = useState("");
    const getInput = (input)=>{
        let newArr = [...data];
        newArr.push(input);
        SetData(newArr);
    }
    // const DeleteItem = (index)=>{
    //     SetData(data.splice(index, 1));
    // }//todo delete
    //to get state of done;
    const GetItemDoneState = (Done)=>{console.log("main recieved"+Done)}

    return(
        <section className="todo-app__main">
            <UserInput getInput={getInput} />
            <ToDoAppList data={data} SendItemDoneState={GetItemDoneState} />
        </section>
    )
}

export default TodoAppMain;
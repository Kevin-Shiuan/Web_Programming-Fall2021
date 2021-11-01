import React, { useEffect, useState, }  from 'react';
import UserInput from '../Components/todo-app__input';
import ToDoAppList from './todo-app__list';

function TodoAppMain(props){
    const [data, SetData] = useState([]);
    const [remain, SetRemain] = useState(data.length);
    // const [ToDo, SetToDo] = useState("");
    const getInput = (input)=>{
        let newArr = [...data];
        newArr.push(input);
        SetRemain(remain+1);
        SetData(newArr);
    }
    // const DeleteItem = (index)=>{
    //     SetData(data.splice(index, 1));
    // }//todo delete
    //to get state of done;
    const GetItemDoneState = (Done)=>{
        Done?SetRemain(remain-1):SetRemain(remain+1);
    }
    useEffect( ()=>{
        props.SendRemain(remain);
    }, [remain] );

    return(
        <section className="todo-app__main">
            <UserInput getInput={getInput} />
            <ToDoAppList data={data} SendItemDoneState={GetItemDoneState} />
        </section>
    )
}

export default TodoAppMain;
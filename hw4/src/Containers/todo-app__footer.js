import React from 'react';
import Button from '../Components/button';

function ToDoAppFooter(props){
    // const [remain, SetRemain] = useState(props.remain);
    // useEffect(()=>{
    //     SetRemain(props.remain);
    //     console.log("footer updated" + props.remain);
    // },[props.remain]);
    // const UpdateLeft = (props)=>{
    //     console.log("footer updated" + props.remain)
    //     return props.remain;
    // }
    return(
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">{props.remain} left</div>
            <ul className="todo-app__view-buttons">
                <li><Button name="All" /></li>
                <li><Button name="Active" /></li>
                <li><Button name="Completed" /></li>
            </ul>
            <div className="todo-app__clean"><Button name="Clear Completed"/></div>
        </footer>
    )
}

export default ToDoAppFooter;
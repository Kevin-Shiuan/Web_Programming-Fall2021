import React, { Fragment } from 'react';
import ToDoAppItem from '../Components/todo-app__item';


function ToDoAppList(props){
    // const [data, SetData] = useState(props.data);
    // useEffect( ()=>{console.log("list noticed" + props.data); SetData(props.data);}, [props.data]);

    const GetItemDoneState = (Done)=>{props.SendItemDoneState(Done)}
    return(
        <Fragment>
            {props.data.map( (x, index) => <ToDoAppItem name={x} key={x} index={index} SendItemDoneState={GetItemDoneState}/>)}
        </Fragment>
    )
}

export default ToDoAppList;
import React from 'react';
import Button from '../Components/button';

function ToDoAppFooter(){
    return(
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total"> left</div>
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
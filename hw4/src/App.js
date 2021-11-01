// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import ToDoAppFooter from './Containers/todo-app__footer';
import TodoAppMain from './Containers/todo-app__main';
// import UserInput from './Components/todo-app__input.js';

function App() {
  const [remain, SetRemain] = useState(0);
  const GetRemain = (Remain)=>{
    SetRemain(Remain);
    console.log("App recieved"+remain+""+Remain);}
  return (
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
      </header>
      <TodoAppMain SendRemain={GetRemain}/>
      <ToDoAppFooter remain={remain}/>
  </div> 
  );
}

export default App;

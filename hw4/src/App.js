// import logo from './logo.svg';
import './App.css';
import ToDoAppFooter from './Containers/todo-app__footer';
import TodoAppMain from './Containers/todo-app__main';
// import UserInput from './Components/todo-app__input.js';

function App() {
  return (
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
      </header>
      <TodoAppMain />
      <ToDoAppFooter />
  </div> 
  );
}

export default App;

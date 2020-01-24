import React from 'react';
import './App.css';
import ToDoList from './todolist'

class App extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <ToDoList></ToDoList>
      </div>
    );
  }
}

export default App;

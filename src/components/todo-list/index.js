import React from "react";
import ToDo from "../todo";
import "./todo-list.css";

const TodoList = ({ toDos, toDoChange }) => {
  const onCompleteChange = (toDo) => {
    toDoChange({ ...toDo, complete: !toDo.complete });
  };
  return (
    <div className="list">
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} toDo={toDo} completeChange={onCompleteChange} />
      ))}
    </div>
  );
};

export default TodoList;

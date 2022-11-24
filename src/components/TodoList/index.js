import React from "react";
import { useTodos } from "./useTodo";
import { useState, useMemo } from "react";
import "./TodoList.css";

export const Todo = React.memo(() => {
  const [input, setInput] = useState("");

  const {
    todoList,
    addTodo,
    renderAllTodoListfn,
    pendingTodoListfn,
    completedTodoListfn,
  } = useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(input);
    setInput("");
  };

  const allTodoList = useMemo(() => renderAllTodoListfn(), [todoList]);
  const pendingTodoList = useMemo(() => pendingTodoListfn(), [todoList]);
  const completedTodoList = useMemo(() => completedTodoListfn(), [todoList]);

  return (
    <>
      <h1>All Tasks</h1>
      <div>{allTodoList}</div>
      <hr></hr>
      <h1>Pending Tasks</h1>
      <div>{pendingTodoList}</div>
      <hr></hr>
      <h1>Completed Tasks</h1>
      <div>{completedTodoList}</div>
      <hr></hr>
      <div className="todolistInputContainer">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </>
  );
});

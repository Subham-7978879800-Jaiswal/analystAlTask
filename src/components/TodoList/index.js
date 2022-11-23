import { useTodos } from "./useTodo";
import { useState } from "react";
import "./TodoList.css";
export const Todo = () => {
  const [input, setInput] = useState("");

  const { todoList, addTodo } = useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(input);
  };

  return (
    <>
      <div>
        {todoList?.map((todo) => {
          return <li>{todo.note}</li>;
        })}
      </div>
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
};

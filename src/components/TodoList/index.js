import { useTodos } from "./useTodo";
import { useState, useMemo } from "react";
import "./TodoList.css";
import { TodoListCard } from "./TodoListCard";
export const Todo = () => {
  const [input, setInput] = useState("");

  const { todoList, addTodo, deleteTodo, completeTodo, pendingTodo } =
    useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(input);
    setInput("");
  };

  const renderAllTodoList = (
    all = false,
    pending = false,
    completed = false
  ) => {
    const todo = [];

    if (all) {
      for (let [key, value] of todoList.entries()) {
        todo.push(
          <TodoListCard
            id={key}
            key={key}
            completed={value.completed}
            createdAt={value.createdAt}
            note={value.note}
            deleteTodo={() => deleteTodo(key)}
            completeTodo={() => completeTodo(key)}
            pendingTodo={() => pendingTodo(key)}
            variant={"primary"}
            allTask={true}
          ></TodoListCard>
        );
      }
    } else if (pending) {
      for (let [key, value] of todoList.entries()) {
        if (!value.completed) {
          todo.push(
            <TodoListCard
              id={key}
              key={key}
              completed={value.completed}
              createdAt={value.createdAt}
              note={value.note}
              deleteTodo={() => deleteTodo(key)}
              variant={"danger"}
              allTask={false}
            ></TodoListCard>
          );
        }
      }
    } else if (completed) {
      for (let [key, value] of todoList.entries()) {
        if (value.completed) {
          todo.push(
            <TodoListCard
              id={key}
              key={key}
              completed={value.completed}
              createdAt={value.createdAt}
              note={value.note}
              deleteTodo={() => deleteTodo(key)}
              variant={"success"}
              allTask={false}
            ></TodoListCard>
          );
        }
      }
    }
    return todo;
  };

  const allTodoList = useMemo(() => renderAllTodoList(true), [todoList]);
  const pendingTodoList = useMemo(
    () => renderAllTodoList(false, true),
    [todoList]
  );
  const completedTodoList = useMemo(
    () => renderAllTodoList(false, false, true),
    [todoList]
  );

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
};

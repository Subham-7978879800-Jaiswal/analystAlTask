import { useTodos } from "./useTodo";
import { useState, useMemo } from "react";
import "./TodoList.css";
import { TodoListCard } from "./TodoListCard";
export const Todo = () => {
  const [input, setInput] = useState("");

  const { todoList, addTodo, deleteTodo, completeTodo } = useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(input);
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
            variant={"primary"}
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
              completeTodo={() => completeTodo(key)}
              variant={"danger"}
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
              completeTodo={() => completeTodo(key)}
              variant={"success"}
            ></TodoListCard>
          );
        }
      }
    }
    return todo;
  };

  const allTodo = useMemo(() => renderAllTodoList(true), [todoList]);
  const pendingTodo = useMemo(() => renderAllTodoList(false, true), [todoList]);
  const completedTodo = useMemo(
    () => renderAllTodoList(false, false, true),
    [todoList]
  );

  return (
    <>
      <div>All Tasks</div>
      <div>{allTodo}</div>
      <div>Pending Tasks</div>
      <div>{pendingTodo}</div>
      <div>Completed Tasks</div>
      <div>{completedTodo}</div>
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

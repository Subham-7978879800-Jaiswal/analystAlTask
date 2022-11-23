import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useTodos = () => {
  const [todoList, setTodoList] = useState(new Map());

  const addTodo = (input) => {
    setTodoList((previous) => {
      const newMap = new Map(previous);
      newMap.set(uuidv4(), {
        note: input,
        createdAt: new Date(),
        completed: false,
      });
      return newMap;
    });
  };

  const deleteTodo = (id) => {
    setTodoList((previous) => {
      const newMap = new Map(previous);
      newMap.delete(id);
      return newMap;
    });
  };

  const completeTodo = (id) => {
    setTodoList((previous) => {
      const newMap = new Map(previous);
      const newTodo = newMap.get(id);
      newTodo.completed = true;
      newMap.set(id, newTodo);
      return newMap;
    });
  };

  return { todoList, addTodo, deleteTodo, completeTodo };
};

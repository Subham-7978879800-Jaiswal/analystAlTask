import { useState } from "react";

export const useTodos = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (input, event) => {
    setTodoList((previous) => {
      return [
        ...previous,
        { note: input, createdAt: new Date(), completed: false },
      ];
    });
  };

  return { todoList, addTodo };
};

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoListCard } from "./TodoListCard";

export const useTodos = () => {
  const InitialTodos = new Map();

  const [todoList, setTodoList] = useState(InitialTodos);

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

  const pendingTodo = (id) => {
    setTodoList((previous) => {
      const newMap = new Map(previous);
      const newTodo = newMap.get(id);
      newTodo.completed = false;
      newMap.set(id, newTodo);
      return newMap;
    });
  };

  const renderAllTodoListfn = (
    variant = "primary",
    allTask = true,
    pending = false,
    completed = false
  ) => {
    const todo = [];

    for (let [key, value] of todoList.entries()) {
      if (pending && value.completed === true) {
        continue;
      }
      if (completed && value.completed === false) {
        continue;
      }

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
          variant={variant}
          allTask={allTask}
        ></TodoListCard>
      );
    }

    return todo;
  };

  const pendingTodoListfn = () => {
    return renderAllTodoListfn("danger", false, true, false);
  };

  const completedTodoListfn = () => {
    return renderAllTodoListfn("success", false, false, true);
  };

  return {
    todoList,
    addTodo,
    deleteTodo,
    completeTodo,
    pendingTodo,
    renderAllTodoListfn,
    pendingTodoListfn,
    completedTodoListfn,
  };
};

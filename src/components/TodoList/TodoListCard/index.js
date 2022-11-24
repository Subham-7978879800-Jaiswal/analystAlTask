import React from "react";
import Alert from "react-bootstrap/Alert";

export const TodoListCard = React.memo(
  ({
    note,
    createdAt,
    completed,
    id,
    deleteTodo,
    completeTodo,
    pendingTodo,
    variant,
    allTask,
  }) => {
    return (
      <Alert
        size={"sm"}
        style={{ padding: "10", borderRadius: "15" }}
        key={id}
        id={id}
        variant={variant}
      >
        Task is {note}
        <p>Created at {createdAt.toLocaleString()}</p>
        {allTask && (
          <>
            {!completed && (
              <>
                <button onClick={completeTodo}>Make it complete</button>
              </>
            )}
            {completed && (
              <>
                <p>Completed 😊</p>
                <button onClick={pendingTodo}>Make it Pending</button>
              </>
            )}
            <button onClick={deleteTodo}>Delete</button>
          </>
        )}
      </Alert>
    );
  }
);

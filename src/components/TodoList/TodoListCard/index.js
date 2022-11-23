import Alert from "react-bootstrap/Alert";
export const TodoListCard = ({
  note,
  createdAt,
  completed,
  id,
  deleteTodo,
  completeTodo,
  variant,
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
      {!completed && (
        <>
          <button onClick={deleteTodo}>Delete</button>
          <button onClick={completeTodo}>Completed</button>
        </>
      )}
      {completed && <p>Completed 😊</p>}
    </Alert>
  );
};

import { memo } from "react";

function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          width: "400px",
          fontSize: "22px",
          cursor: "pointer",

          textDecoration: todo.completed ? "line-through" : "none",

          opacity: todo.completed ? 0.5 : 1,
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        style={{
          padding: "8px 15px",
          fontSize: "16px",
        }}
      >
        Xóa
      </button>
    </div>
  );
}

export default memo(TodoItem);

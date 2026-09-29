import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo }) {
  if (todos.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        Chưa có công việc nào.
      </p>
    );
  }

  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </section>
  );
}

export default TodoList;

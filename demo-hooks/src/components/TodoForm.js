import { useContext, useRef, useState } from "react";

import { ThemeContext } from "../App";

function TodoForm({ addTodo }) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = input.trim();

    if (!text) {
      inputRef.current.focus();
      return;
    }

    addTodo(text);

    setInput("");

    inputRef.current.focus();
  };

  return (
    <section
      style={{
        textAlign: "center",
        padding: "30px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h2>Thêm công việc</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Nhập công việc..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "500px",
            padding: "12px",
            fontSize: "18px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            fontSize: "18px",
          }}
        >
          Thêm
        </button>
      </form>
    </section>
  );
}

export default TodoForm;

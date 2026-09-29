import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import useLocalStorage from "./hooks/useLocalStorage";

import initialTodos from "./datas/todos";

// ==========================================
// CONTEXT
// ==========================================

export const ThemeContext = createContext();

// ==========================================
// REDUCER
// ==========================================

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      );

    default:
      return state;
  }
}

// ==========================================
// APP
// ==========================================

function App() {
  // useState
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <TodoApp />
    </ThemeContext.Provider>
  );
}

// ==========================================
// TODO APP
// ==========================================

function TodoApp() {
  // useContext
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  // useLocalStorage
  const [savedTodos, setSavedTodos] = useLocalStorage("todos", initialTodos);

  // useReducer
  const [todos, dispatch] = useReducer(todoReducer, savedTodos);

  // useEffect
  useEffect(() => {
    setSavedTodos(todos);
  }, [todos]);

  // useMemo
  const unfinishedCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  // useCallback - thêm
  const addTodo = useCallback((text) => {
    dispatch({
      type: "ADD_TODO",
      payload: text,
    });
  }, []);

  // useCallback - xóa
  const deleteTodo = useCallback((id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []);

  // useCallback - hoàn thành
  const toggleTodo = useCallback((id) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",

        backgroundColor: darkMode ? "#222" : "#f5f5f5",

        color: darkMode ? "white" : "black",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "30px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1>React Hooks Demo</h1>

        <button
          onClick={toggleTheme}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          {darkMode ? (
            <>
              <CiLight />
              Light
            </>
          ) : (
            <>
              <MdDarkMode />
              Dark
            </>
          )}
        </button>
      </header>

      <TodoForm addTodo={addTodo} />

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h2>Chưa hoàn thành: {unfinishedCount}</h2>
      </div>

      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;

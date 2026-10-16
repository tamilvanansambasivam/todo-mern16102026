import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API = "http://localhost:5001/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(API).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await axios.post(API, { title });
    setTodos([res.data, ...todos]);
    setTitle("");
  };

  const toggleTodo = async (todo) => {
    const res = await axios.put(`${API}/${todo._id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              className={todo.completed ? "done" : ""}
              onClick={() => toggleTodo(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

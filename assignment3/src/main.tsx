import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

export default function App() {
  // State for tasks (no type annotation)
  const [tasks, setTasks] = useState([
    { id: "1", text: "Get an MRI", due: "2025-10-25", done: false },
    { id: "2", text: "Get blood taken", due: "2025-10-015", done: false },
    { id: "3", text: "Halloween festivities", due: "2025-10-31", done: false },
    { id: "4", text: "Go camping", due: "2025-10-12", done: false }
  ]);

  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My To-Do List</h1>
      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleDone(task.id)}
          />
          <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
            {task.text} (Due: {task.due})
          </span>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

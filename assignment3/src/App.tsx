import React, { useState } from "react";

type Task = {
  id: string;
  text: string;
  due: string;
  done: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Get an MRI", due: "2025-10-05", done: false },
    { id: "2", text: "Get blood taken", due: "2025-10-06", done: false }
  ]);

  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
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

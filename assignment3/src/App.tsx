import React, { useState } from "react";

type Task = {
  id: string;
  text: string;
  due: string;
  done: boolean;
};

export default function App() {
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Get an MRI", due: "2025-10-05", done: false },
    { id: "2", text: "Get blood taken", due: "2025-10-06", done: false },
    { id: "3", text: "Halloween festivities", due: "2025-10-31", done: false },
    { id: "4", text: "Go camping", due: "2025-10-12", done: false },
  ]);

  // State for new task input
  const [newText, setNewText] = useState("");
  const [newDue, setNewDue] = useState("");

  // Toggle done
  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  // Add new task
  const addTask = () => {
    if (!newText || !newDue) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newText,
      due: newDue,
      done: false,
    };
    setTasks(prev => [...prev, newTask]);
    setNewText("");
    setNewDue("");
  };

  return (
    <main className="container">
      <h1>My To-Do List</h1>

      <div className="table">
        {/* Table Header */}
        <div className="row header">
          <div className="cell grow">Task</div>
          <div className="cell">Due Date</div>
        </div>

        {/* Tasks */}
        {tasks.map(task => (
          <div key={task.id} className="row">
            <div className="cell grow">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span className={`task ${task.done ? "done" : ""}`}>{task.text}</span>
            </div>
            <div className="cell">{task.due}</div>
          </div>
        ))}

        {/* Add New Task */}
        <div className="row add">
          <div className="cell grow">
            <input
              placeholder="New task"
              value={newText}
              onChange={e => setNewText(e.target.value)}
            />
          </div>
          <div className="cell">
            <input
              type="date"
              value={newDue}
              onChange={e => setNewDue(e.target.value)}
            />
          </div>
          <div className="cell">
            <button onClick={addTask}>Add</button>
          </div>
        </div>
      </div>
    </main>
  );
}

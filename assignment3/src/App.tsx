import React, { useState } from "react";

type TaskItem = {
  id: string;
  text: string;
  due: string;
  done: boolean;
};

type TaskCategoryType = {
  id: string;
  name: string;
  items: TaskItem[];
};

// Initial mock tasks
const INITIAL_TASKS: TaskCategoryType[] = [
  {
    id: "tasks",
    name: "Tasks",
    items: [
      { id: "t1", text: "Get an MRI", due: "2025-10-05", done: false },
      { id: "t2", text: "Get blood taken", due: "2025-10-06", done: false },
      { id: "t3", text: "Halloween festivities", due: "2025-10-31", done: false },
      { id: "t4", text: "Go camping", due: "2025-10-12", done: false }
    ]
  }
];

function TaskHeader() {
  return (
    <div className="row header">
      <div className="cell grow">Task</div>
      <div className="cell">Due</div>
      <div className="cell"></div>
    </div>
  );
}

function TaskRow({ item, toggleDone }: { item: TaskItem; toggleDone: (id: string) => void }) {
  return (
    <div className="row">
      <div className="cell grow">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => toggleDone(item.id)}
        />
        <span className={`task ${item.done ? "done" : ""}`}>{item.text}</span>
      </div>
      <div className="cell">{item.due}</div>
    </div>
  );
}

function AddTaskRow({ addTask }: { addTask: (text: string, due: string) => void }) {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");

  const handleAdd = () => {
    if (text && due) {
      addTask(text, due);
      setText("");
      setDue("");
    }
  };

  return (
    <div className="row add">
      <div className="cell grow">
        <input
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="cell">
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
      <div className="cell">
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

function TaskCategory({ category, toggleDone, addTask }: {
  category: TaskCategoryType;
  toggleDone: (id: string) => void;
  addTask: (text: string, due: string) => void;
}) {
  return (
    <div className="category">
      <div className="categoryTitle">{category.name}</div>
      {category.items.map(item => (
        <TaskRow key={item.id} item={item} toggleDone={toggleDone} />
      ))}
      <AddTaskRow addTask={addTask} />
    </div>
  );
}

function TaskTable({ data, toggleDone, addTask }: {
  data: TaskCategoryType[];
  toggleDone: (id: string) => void;
  addTask: (text: string, due: string) => void;
}) {
  return (
    <div className="table">
      <TaskHeader />
      {data.map(cat => (
        <TaskCategory
          key={cat.id}
          category={cat}
          toggleDone={toggleDone}
          addTask={addTask}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState<TaskCategoryType[]>(INITIAL_TASKS);

  // Toggle done/undone
  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(item =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      }))
    );
  };

  // Add new task
  const addTask = (text: string, due: string) => {
    setTasks(prev =>
      prev.map(cat => ({
        ...cat,
        items: [
          ...cat.items,
          { id: `t${Date.now()}`, text, due, done: false }
        ]
      }))
    );
  };

  return (
    <main className="container">
      <h1>My To-Do List</h1>
      <TaskTable data={tasks} toggleDone={toggleDone} addTask={addTask} />
    </main>
  );
}

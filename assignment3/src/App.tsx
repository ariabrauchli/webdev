import React from "react";

// Mock data for tasks
const TASKS = [
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

// Table header component
function TaskHeader() {
  return (
    <div className="row header">
      <div className="cell grow">Task</div>
      <div className="cell">Due</div>
      <div className="cell"></div>
    </div>
  );
}

// Single task row
type TaskItem = {
  id: string;
  text: string;
  due: string;
  done: boolean;
};

function TaskRow({ item }: { item: TaskItem }) {
  return (
    <div className="row">
      <div className="cell grow">
        <input type="checkbox" checked={item.done} readOnly />
        <span className={`task ${item.done ? "done" : ""}`}>{item.text}</span>
      </div>
      <div className="cell">{item.due}</div>
      <div className="cell">
        <button className="ghost" title="Delete">X</button>
      </div>
    </div>
  );
}

// Add task row
function AddTaskRow() {
  return (
    <div className="row add">
      <div className="cell grow">
        <input placeholder="New task" />
      </div>
      <div className="cell">
        <input type="date" />
      </div>
      <div className="cell">
        <button>Add</button>
      </div>
    </div>
  );
}

// Task category section
type TaskCategoryType = {
  id: string;
  name: string;
  items: TaskItem[];
};

function TaskCategory({ category }: { category: TaskCategoryType }) {
  return (
    <div className="category">
      <div className="categoryTitle">{category.name}</div>
      {category.items.map(item => <TaskRow key={item.id} item={item} />)}
      <AddTaskRow />
    </div>
  );
}

// Task table
function TaskTable({ data }: { data: TaskCategoryType[] }) {
  return (
    <div className="table">
      <TaskHeader />
      {data.map(cat => <TaskCategory key={cat.id} category={cat} />)}
    </div>
  );
}

// Main App
export default function App() {
  return (
    <main className="container">
      <h1>My To-Do List</h1>
      <TaskTable data={TASKS} />
    </main>
  );
}

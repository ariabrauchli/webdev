import { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";

export type Todo = {
  id: number;
  label: string;
  done: boolean;
};

let nextId = 8;

const INITIAL_TODOS: Todo[] = [
  { id: 1, label: "grocery shopping", done: true },
  { id: 2, label: "laundry", done: true },
  { id: 3, label: "amazon returns", done: false },
  { id: 4, label: "front end web dev assignment", done: false },
  { id: 5, label: "laundry", done: false },
  { id: 6, label: "vacuum house", done: false },
  { id: 7, label: "replace bike chain", done: false },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  function handleToggle(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleRemove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleAdd(label: string) {
    if (!label.trim()) return;
    setTodos((prev) => [...prev, { id: nextId++, label, done: false }]);
  }

  return (
    <main>
      <Header />
      <ToDoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      <AddToDo onAdd={handleAdd} />
    </main>
  );
}
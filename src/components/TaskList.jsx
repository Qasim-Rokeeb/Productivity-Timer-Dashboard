// src/components/TaskList.jsx
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";

export default function TaskList({ tasks, setTasks }) {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), done: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Task List</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New Task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input flex-1"
        />
        <button onClick={addTask} className="btn-primary">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center px-4 py-2 rounded border ${
              task.done ? "bg-green-100 dark:bg-green-900 line-through" : ""
            }`}
          >
            <span>{task.text}</span>
            <div className="flex gap-2">
              <button onClick={() => toggleTask(index)} title="Toggle done">
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button onClick={() => deleteTask(index)} title="Delete">
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

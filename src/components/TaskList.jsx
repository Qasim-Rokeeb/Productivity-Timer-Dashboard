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

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  const deleteTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <h2 className="font-poppins text-xl font-semibold">Task List</h2>

      {/* add */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md
                     placeholder-gray-500 dark:placeholder-gray-400
                     border border-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={addTask}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium
                     hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* list */}
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li
            key={i}
            className={`flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md
                        border border-transparent transition-all
                        ${task.done ? "opacity-60" : ""}`}
          >
            <span className={`flex-1 ${task.done ? "line-through" : ""}`}>
              {task.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(i)}
                className="p-1.5 rounded-full hover:bg-green-200/50 dark:hover:bg-green-700/30"
                title="Toggle done"
              >
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={() => deleteTask(i)}
                className="p-1.5 rounded-full hover:bg-red-200/50 dark:hover:bg-red-700/30"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
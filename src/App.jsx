// src/App.jsx
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import ProgressBar from "./components/ProgressBar";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? Number(saved) : 0;
  });

  // Save tasks and sessions to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("sessions", completedSessions);
  }, [tasks, completedSessions]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Productivity Dashboard ⏱️</h1>
          <ThemeToggle />
        </div>
        <Timer onComplete={() => setCompletedSessions((s) => s + 1)} />
        <ProgressBar value={completedSessions} max={4} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

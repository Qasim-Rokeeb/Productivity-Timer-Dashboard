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

  const [completedSessions, setCompletedSessions] = useState(() =>
    Number(localStorage.getItem("sessions") || 0)
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("sessions", completedSessions);
  }, [tasks, completedSessions]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300
                     dark:from-slate-900 dark:via-slate-800 dark:to-black
                     text-slate-800 dark:text-slate-100 font-inter p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="font-poppins text-3xl font-bold">Productivity Dashboard ⏱️</h1>
          <ThemeToggle />
        </header>

        <Timer onComplete={() => setCompletedSessions((s) => s + 1)} />
        <ProgressBar value={completedSessions} max={4} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
}
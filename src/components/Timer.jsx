// src/components/Timer.jsx
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react"; // Icon imports

export default function Timer({ onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
      <div className="text-5xl font-mono tracking-widest">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-medium transition ${
            isRunning
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          <Play className="w-5 h-5" />
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-medium transition ${
            !isRunning
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          <Pause className="w-5 h-5" />
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(25 * 60);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-medium transition bg-red-600 text-white hover:bg-red-700"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>
    </div>
  );
}

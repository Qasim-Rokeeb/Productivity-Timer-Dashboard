// src/components/Timer.jsx
import { useState, useEffect } from "react";

export default function Timer({ onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  // Countdown effect
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
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
      <div className="text-5xl font-mono tracking-widest">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="space-x-2">
        <button
          className="btn-primary"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="btn-secondary"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(25 * 60);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

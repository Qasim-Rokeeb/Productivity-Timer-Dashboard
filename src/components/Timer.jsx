import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const SESSION_MIN = 25;

export default function Timer({ onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_MIN * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft === 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
      onComplete();
    }
  }, [secondsLeft, onComplete]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const pct = ((SESSION_MIN * 60 - secondsLeft) / (SESSION_MIN * 60)) * 100;

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="font-poppins text-2xl font-semibold">Pomodoro Timer</h2>

      {/* circular ring */}
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            className="stroke-gray-300/40 dark:stroke-gray-700/40"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-emerald-500 drop-shadow-[0_0_6px_theme('colors.emerald.400')]"
            style={{
              strokeDasharray: 283,
              strokeDashoffset: 283 * (1 - pct / 100),
              transition: "stroke-dashoffset 1s linear",
            }}
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-5xl font-bold text-emerald-600 dark:text-emerald-400">
            {mins}:{secs}
          </span>
        </div>
      </div>

      {/* controls */}
     <div className="flex gap-4">
  <button
    onClick={() => setIsRunning(true)}
    disabled={isRunning}
    className="btn-icon bg-emerald-500 disabled:bg-gray-400/40 disabled:cursor-not-allowed
               enabled:hover:bg-emerald-600 enabled:hover:scale-110 active:scale-95
               enabled:shadow-[0_0_12px_theme('colors.emerald.400')]
               transition-all duration-200"
  >
    <Play size={22} />
  </button>

  <button
    onClick={() => setIsRunning(false)}
    disabled={!isRunning}
    className="btn-icon bg-yellow-500 disabled:bg-gray-400/40 disabled:cursor-not-allowed
               enabled:hover:bg-yellow-600 enabled:hover:scale-110 active:scale-95
               enabled:shadow-[0_0_12px_theme('colors.yellow.400')]
               transition-all duration-200"
  >
    <Pause size={22} />
  </button>

  <button
    onClick={() => {
      setIsRunning(false);
      setSecondsLeft(SESSION_MIN * 60);
    }}
    className="btn-icon bg-rose-500 hover:bg-rose-600 hover:scale-110 active:scale-95
               shadow-[0_0_12px_theme('colors.rose.400')]
               transition-all duration-200"
  >
    <RotateCcw size={22} />
  </button>
</div>

<style jsx>{`
  .btn-icon {
    @apply flex items-center justify-center w-14 h-14 rounded-full text-white;
  }
`}</style>

      <style jsx>{`
        .btn-icon {
          @apply flex items-center justify-center w-12 h-12 rounded-full shadow-md text-white transition;
        }
      `}</style>
    </div>
  );
}
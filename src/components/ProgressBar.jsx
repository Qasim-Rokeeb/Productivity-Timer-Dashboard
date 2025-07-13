// src/components/ProgressBar.jsx
export default function ProgressBar({ value, max }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Today's Progress</h2>
      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-4 overflow-hidden">
        <div
          className="bg-purple-600 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {value} / {max} sessions completed
      </p>
    </div>
  );
}

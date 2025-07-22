export default function ProgressBar({ value, max }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      <h2 className="font-poppins text-xl font-semibold">Today’s Progress</h2>
      <div className="w-full h-3 rounded-full bg-white/20 dark:bg-gray-700/30 backdrop-blur-sm overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500
                      ${pct === 100 ? "shadow-[0_0_10px_theme('colors.emerald.400')]" : ""}
                      transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {value} / {max} sessions completed
      </p>
    </div>
  );
}
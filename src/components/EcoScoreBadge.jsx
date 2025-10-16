export default function EcoScoreBadge({ score }) {
  const color = score >= 4 ? 'bg-emerald-500' : score >= 3 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <span
      className={`${color} inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm`}
    >
      Eco-Score {score.toFixed(1)}
    </span>
  );
}

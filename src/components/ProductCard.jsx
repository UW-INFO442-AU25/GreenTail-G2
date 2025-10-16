import EcoScoreBadge from './EcoScoreBadge.jsx';

export default function ProductCard({ product }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-dark">{product.name}</h3>
        <EcoScoreBadge score={product.ecoScore} />
      </div>
      <p className="text-sm text-slate-600">{product.description}</p>
      <dl className="grid grid-cols-2 gap-2 text-xs text-slate-500">
        <div>
          <dt className="font-semibold text-slate-600">适用宠物</dt>
          <dd>{product.petType}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600">蛋白来源</dt>
          <dd>{product.proteinSource}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600">可持续亮点</dt>
          <dd>{product.sustainabilityHighlights.join(' / ')}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600">饮食限制</dt>
          <dd>{product.dietaryTags.join(' / ') || '无'}</dd>
        </div>
      </dl>
    </article>
  );
}

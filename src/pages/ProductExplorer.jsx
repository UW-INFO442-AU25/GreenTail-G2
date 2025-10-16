import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import EcoScoreBadge from '../components/EcoScoreBadge.jsx';
import { products } from '../data/products.js';
import { useQuiz } from '../context/QuizContext.jsx';

export default function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('ecoScore');
  const {
    state: { dietaryRestrictions, petType, ecoPriority },
  } = useQuiz();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.proteinSource.toLowerCase().includes(normalizedQuery);
        const matchesPet = !petType || product.petType.toLowerCase().includes(petType.split('-')[0]);
        const matchesDietary =
          dietaryRestrictions.length === 0 ||
          dietaryRestrictions.every((restriction) =>
            product.dietaryTags.map((tag) => tag.toLowerCase()).includes(restriction),
          );
        return matchesQuery && matchesPet && matchesDietary;
      })
      .sort((a, b) => {
        if (sortKey === 'ecoScore') {
          const weight = ecoPriority === 'high-eco' ? 1.2 : ecoPriority === 'value' ? 0.8 : 1;
          return b.ecoScore * weight - a.ecoScore * weight;
        }
        return a.name.localeCompare(b.name);
      });
  }, [dietaryRestrictions, ecoPriority, petType, query, sortKey]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-brand-dark">产品探索与推荐</h1>
        <p className="text-sm text-slate-600">
          我们会根据你的测验偏好筛选产品。Eco-Score 越高，代表供应链与包装越可持续。
        </p>
      </header>
      <section className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">当前偏好</p>
          <p className="text-sm text-brand-dark">
            宠物：{petType || '未选择'} · 环保优先级：{ecoPriority} · 饮食限制：
            {dietaryRestrictions.length ? dietaryRestrictions.join('、') : '无'}
          </p>
        </div>
        <EcoScoreBadge score={4.1} />
      </section>
      <section className="flex flex-wrap gap-4 rounded-3xl bg-white p-6 shadow-sm">
        <label className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 focus-within:border-brand">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">搜索</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none"
            placeholder="输入蛋白来源或产品名称"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">排序</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="ecoScore">Eco-Score（高到低）</option>
            <option value="name">按名称（A-Z）</option>
          </select>
        </label>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {filteredProducts.length ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            没有找到符合条件的产品，请调整搜索或测验偏好。
          </div>
        )}
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import EcoScoreBadge from '../components/EcoScoreBadge.jsx';
import { products } from '../data/products.js';

export default function Home() {
  const heroProduct = products[0];

  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-brand-light px-4 py-2 text-xs font-semibold text-brand-dark">
            可持续宠粮新手引导
          </p>
          <h1 className="text-4xl font-bold text-brand-dark">为毛孩子选择更绿色的未来</h1>
          <p className="text-lg text-slate-600">
            GreenTail 将 Eco-Score 透明呈现，并结合你的宠物画像提供个性化推荐。五步测验即可开启环保之旅。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/quiz"
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
            >
              开始 Eco-Score 测验
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-brand-dark px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-light/60"
            >
              浏览可持续产品
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-brand-light bg-brand-light/40 p-6">
          <h2 className="text-sm font-semibold text-brand-dark">生态亮点示例</h2>
          <div className="mt-4 space-y-3 rounded-2xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-brand-dark">{heroProduct.name}</p>
              <EcoScoreBadge score={heroProduct.ecoScore} />
            </div>
            <p className="text-sm text-slate-600">{heroProduct.description}</p>
            <ul className="list-inside list-disc text-xs text-slate-500">
              {heroProduct.sustainabilityHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-brand-dark">为什么选择 GreenTail？</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: '透明的 Eco-Score',
              description: '基于包装、原料与供应链的评分模型，帮助你快速识别低碳足迹产品。',
            },
            {
              title: '新手友好测验',
              description: '五步问答即可生成宠物档案，并同步至 Firebase Firestore。',
            },
            {
              title: '个性化推荐',
              description: '结合静态产品数据与用户偏好，提供实时排序与筛选体验。',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-dark">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

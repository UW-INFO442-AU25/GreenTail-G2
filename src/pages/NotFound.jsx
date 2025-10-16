import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-6 text-center">
      <h1 className="text-5xl font-bold text-brand-dark">404</h1>
      <p className="text-sm text-slate-600">页面走失了，让我们带你回到可持续的旅程。</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
      >
        返回首页
      </Link>
    </div>
  );
}

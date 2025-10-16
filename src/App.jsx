import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import ProductExplorer from './pages/ProductExplorer.jsx';
import NotFound from './pages/NotFound.jsx';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-brand text-white' : 'text-brand-dark hover:bg-brand-light/60'
  }`;

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-brand-dark">GreenTail</span>
          </NavLink>
          <nav className="flex gap-2">
            <NavLink to="/" className={navLinkClass} end>
              首页
            </NavLink>
            <NavLink to="/quiz" className={navLinkClass}>
              Eco-Score 测验
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              产品探索
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/products" element={<ProductExplorer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-brand-dark py-6 text-center text-sm text-slate-200">
        GreenTail · Empowering sustainable pet care
      </footer>
    </div>
  );
}

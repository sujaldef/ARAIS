import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/BaseComponents';
import { useNavigate, Link } from 'react-router-dom';

const ROUTES = [
  { title: 'Dashboard', path: '/', desc: 'Overview and quick stats' },
  {
    title: 'Data Ingestion',
    path: '/ingestion',
    desc: 'Upload and manage datasets',
  },
  { title: 'Live Analysis', path: '/live', desc: 'Monitor real-time inputs' },
  { title: 'Inference', path: '/inference', desc: 'Run model inference' },
  {
    title: 'Model Control',
    path: '/model-control',
    desc: 'Manage models and versions',
  },
  { title: 'Evaluation', path: '/evaluation', desc: 'View evaluation reports' },
  { title: 'Feedback', path: '/feedback', desc: 'Inspect user feedback' },
  { title: 'Settings', path: '/settings', desc: 'System and user preferences' },
];

const PageIllustration = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <rect
      x="0"
      y="0"
      width="800"
      height="600"
      rx="20"
      fill="#0f172a"
      opacity="0.02"
    />
    <g transform="translate(120,80)">
      <circle cx="220" cy="160" r="110" fill="url(#g1)" opacity="0.14" />
      <g transform="translate(80,40)">
        <rect
          x="0"
          y="0"
          width="240"
          height="140"
          rx="12"
          fill="#0b1220"
          stroke="#1f2937"
        />
        <circle cx="40" cy="40" r="10" fill="#fff" opacity="0.12" />
        <rect
          x="18"
          y="30"
          width="180"
          height="18"
          rx="6"
          fill="#fff"
          opacity="0.06"
        />
      </g>
      <g transform="translate(350,70)">
        <path
          d="M10 120 C40 40, 140 40, 170 120"
          stroke="#06b6d4"
          strokeWidth="6"
          fill="none"
          opacity="0.2"
        />
        <circle cx="90" cy="60" r="18" fill="#7c3aed" opacity="0.9" />
      </g>
    </g>
  </svg>
);

const SuggestionCard = ({ item }) => (
  <Link to={item.path} aria-label={`Go to ${item.title}`} className="group">
    <motion.div
      whileHover={{ y: -6 }}
      className="border border-slate-200/6 p-4 rounded-lg bg-slate-800/40 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white text-lg font-semibold">
          {item.title[0]}
        </div>
        <div>
          <h3 className="text-white text-sm font-semibold">{item.title}</h3>
          <p className="text-slate-300 text-xs mt-1">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  </Link>
);

const SearchBar = ({ data, onNavigate }) => {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return data;
    return data.filter(
      (d) =>
        d.title.toLowerCase().includes(query) ||
        d.desc.toLowerCase().includes(query),
    );
  }, [q, data]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label htmlFor="site-search" className="sr-only">
        Search site
      </label>
      <div className="flex items-center gap-3 bg-slate-900/60 p-2 rounded-md border border-slate-700">
        <input
          id="site-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (results[0]) onNavigate(results[0].path);
            }
          }}
          className="flex-1 bg-transparent outline-none px-2 py-3 text-sm text-white"
          placeholder="Search pages, e.g. 'inference', 'datasets'..."
          aria-label="Search site"
        />
        <Button
          onClick={() => q && onNavigate(results[0]?.path || '/')}
          variant="primary"
          size="sm"
        >
          Go
        </Button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {results.slice(0, 4).map((r) => (
          <button
            key={r.path}
            onClick={() => onNavigate(r.path)}
            className="text-left text-xs text-slate-300 p-2 rounded hover:bg-slate-800/50"
          >
            {r.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90 }}
          className="flex-1 w-full"
        >
          <div className="flex items-center gap-6">
            <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">
              404
            </h1>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">We can’t find that page</h2>
              <p className="text-slate-300 max-w-xl">
                The module you’re looking for was either moved, renamed, or
                never existed. Try searching below or use the quick links.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <SearchBar data={ROUTES} onNavigate={(p) => navigate(p)} />
          </div>

          <div className="mt-10">
            <h3 className="text-sm text-slate-400 mb-3">Quick links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROUTES.slice(0, 6).map((r) => (
                <SuggestionCard key={r.path} item={r} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => navigate('/')} variant="primary" size="lg">
              Return to Dashboard
            </Button>
            <Button onClick={() => navigate(-1)} variant="secondary" size="lg">
              Go Back
            </Button>
            <a
              href="mailto:support@example.com"
              className="ml-auto text-sm text-slate-400 hover:text-white"
            >
              Contact support
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80 }}
          className="w-full max-w-xl"
        >
          <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700">
            <PageIllustration className="w-full h-64" />
            <div className="mt-4">
              <h4 className="text-white font-semibold">Helpful tips</h4>
              <ul className="mt-2 text-slate-300 text-sm list-disc list-inside space-y-1">
                <li>Check the URL for typos.</li>
                <li>Use the search to find pages quickly.</li>
                <li>Visit the Dashboard for an overview of the system.</li>
              </ul>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => navigate('/ingestion')} variant="ghost">
                Upload Data
              </Button>
              <Button
                onClick={() => navigate('/model-control')}
                variant="ghost"
              >
                Manage Models
              </Button>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            <p>
              If you believe this is an error, please let us know via the
              feedback page or contact your administrator.
            </p>
          </div>
        </motion.div>
      </div>

      <footer className="max-w-7xl mx-auto mt-12 text-center text-slate-600 text-sm">
        <div>
          © {new Date().getFullYear()} ARAIS — Need help?{' '}
          <Link to="/feedback" className="text-slate-300 hover:underline">
            Send feedback
          </Link>
        </div>
      </footer>
    </motion.div>
  );
};

export default NotFoundPage;

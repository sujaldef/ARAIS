import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Settings, Activity } from 'lucide-react';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    const routes = {
      '/dashboard': 'Dashboard',
      '/data-ingestion': 'Data Ingestion',
      '/live-analysis': 'Live Analysis',
      '/model-control': 'Model Control',
      '/ood-alerts': 'OOD Alerts',
      '/evaluation': 'Evaluation',
      '/settings': 'Settings',
    };
    return routes[location.pathname] || 'ARAIS';
  };

  const formatTime = () =>
    time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <header className="fixed top-0 right-0 left-[220px] h-[52px] bg-bg-panel border-b border-border flex items-center justify-between px-4 z-100">
      {/* Left: Page title */}
      <h1 className="text-sm font-semibold text-text-primary">
        {getPageTitle()}
      </h1>

      {/* Center: Breadcrumb + Session info */}
      <div className="flex-1 flex flex-col items-center justify-center mx-8">
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <span>ARAIS</span>
          <ChevronRight size={12} />
          <span>{getPageTitle()}</span>
        </div>
        <div className="text-xs text-text-muted mt-1">
          Session 001 · Started 0h 00m ago
        </div>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-4">
        {/* Pipeline status */}
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <div className="w-2 h-2 rounded-full bg-normal animate-pulse"></div>
          <span>RUNNING</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border"></div>

        {/* Active model badge */}
        <button
          onClick={() => navigate('/model-control')}
          className="px-3 py-1 text-xs bg-bg-elevated border border-border-strong rounded hover:border-border-strong transition-all"
        >
          T2 · 28ms
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-border"></div>

        {/* Clock */}
        <div className="text-xs font-mono text-text-secondary">
          {formatTime()}
        </div>

        {/* Settings button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-1 hover:bg-bg-hover rounded transition-colors"
          title="Settings"
        >
          <Settings size={16} className="text-text-secondary" />
        </button>
      </div>
    </header>
  );
}

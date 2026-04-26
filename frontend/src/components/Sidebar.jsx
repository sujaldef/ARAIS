import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Activity,
  Cpu,
  AlertTriangle,
  BarChart2,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Data Ingestion', path: '/data-ingestion' },
  { icon: Activity, label: 'Live Analysis', path: '/live-analysis' },
  { icon: Cpu, label: 'Model Control', path: '/model-control' },
  { icon: AlertTriangle, label: 'OOD Alerts', path: '/ood-alerts' },
  { icon: BarChart2, label: 'Evaluation', path: '/evaluation' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resources, setResources] = React.useState({ cpu: 54, ram: 2.1 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setResources({
        cpu: Math.floor(Math.random() * 100),
        ram: parseFloat((Math.random() * 8).toFixed(1)),
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="fixed left-0 top-0 w-[220px] h-full bg-bg-panel border-r border-border flex flex-col z-raised">
      {/* Logo area */}
      <div className="h-16 border-b border-border bg-bg-elevated flex items-center gap-3 px-4">
        <div className="w-7 h-7 bg-gradient-to-br from-active to-ood rounded flex items-center justify-center text-sm font-bold">
          ⚡
        </div>
        <div>
          <div className="text-sm font-bold text-text-primary">ARAIS</div>
          <div className="text-xs text-text-muted">v1.0 · Intelligence</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-0">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const dividerBefore = idx === 6; // Before Settings

          return (
            <React.Fragment key={item.path}>
              {dividerBefore && (
                <div className="my-2 border-t border-border"></div>
              )}
              <button
                onClick={() => navigate(item.path)}
                className={`w-full h-11 px-4 flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-bg-selected border-l-2 border-active text-text-primary'
                    : 'hover:bg-bg-hover text-text-secondary'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* System Resources */}
      <div className="border-t border-border bg-bg-panel-alt p-3 text-xs space-y-3">
        <div>
          <div className="flex justify-between mb-1 text-text-muted">
            <span>CPU</span>
            <span className="font-mono">{resources.cpu}%</span>
          </div>
          <div className="h-1 bg-bg-base rounded overflow-hidden">
            <div
              className={`h-full transition-all ${
                resources.cpu > 80
                  ? 'bg-anomaly'
                  : resources.cpu > 60
                    ? 'bg-uncertain'
                    : 'bg-normal'
              }`}
              style={{ width: `${resources.cpu}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1 text-text-muted">
            <span>RAM</span>
            <span className="font-mono">{resources.ram}/8.0GB</span>
          </div>
          <div className="h-1 bg-bg-base rounded overflow-hidden">
            <div
              className="h-full bg-active transition-all"
              style={{ width: `${(resources.ram / 8) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-text-muted flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-normal animate-pulse"></div>
          <span className="font-mono">Pipeline: RUNNING</span>
        </div>
      </div>
    </aside>
  );
}

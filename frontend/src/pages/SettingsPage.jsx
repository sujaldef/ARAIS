import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel, Button, Divider } from '../components/ui/BaseComponents';

const categories = [
  { id: 'general', label: 'General', icon: 'âš™ï¸' },
  { id: 'api', label: 'API & Keys', icon: 'ðŸ—ï¸' },
  { id: 'nodes', label: 'Compute Nodes', icon: 'ðŸ–¥ï¸' },
  { id: 'security', label: 'Security', icon: 'ðŸ›¡ï¸' },
  { id: 'alerts', label: 'Notifications', icon: 'ðŸ””' },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          System Settings
        </h1>
        <p className="text-text-secondary">
          Configure environment variables and system-wide policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Panel header={false} className="sticky top-6">
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-bg-selected text-active'
                      : 'text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-6">
          <Panel title="\ Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted uppercase">
                    Environment Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary"
                    defaultValue="Production-Cluster-Alpha"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted uppercase">
                    Data Retention (Days)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary"
                    defaultValue="90"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      Debug Mode
                    </div>
                    <div className="text-xs text-text-muted">
                      Enable verbose logging for inference runs
                    </div>
                  </div>
                  <input type="checkbox" className="h-4 w-4 accent-active" />
                </div>
              </div>
              <Divider />
              <div className="flex justify-end gap-3">
                <Button variant="ghost">Reset to Default</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-3">
          <Panel title="Change Summary" variant="elevated">
            <div className="space-y-4">
              <div className="p-3 bg-active/5 border border-active/20 rounded text-xs text-text-secondary">
                No pending changes to apply.
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase">
                  Last Modified
                </div>
                <div className="text-xs text-text-secondary">
                  Today, 10:24 AM by admin_sujal
                </div>
              </div>
              <Divider />
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase">
                  Deployment Status
                </div>
                <div className="flex items-center gap-2 text-xs text-normal">
                  <div className="w-2 h-2 rounded-full bg-normal animate-pulse" />
                  Synced with Cluster
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;

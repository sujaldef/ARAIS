import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel, Button, Badge, Divider } from '../components/ui/BaseComponents';

const DataIngestionPage = () => {
  const [activeTab, setActiveTab] = useState('file');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Data Ingestion</h1>
        <p className="text-text-secondary">
          Configure and monitor data sources for ARAIS analysis.
        </p>
      </div>

      <div className="flex gap-2 border-b border-border mb-4">
        {['file', 'stream', 'api'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 capitalize ${
              activeTab === tab
                ? 'border-active text-active'
                : 'border-transparent text-text-muted'
            }`}
          >
            {tab} Upload
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Configuration" className="lg:col-span-2">
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-active transition-colors cursor-pointer">
                <p className="text-text-secondary">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-text-muted mt-2">
                  Supports CSV, JSON, Parquet (Max 500MB)
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost">Clear</Button>
                <Button>Process Data</Button>
              </div>
            </div>
          )}
          {activeTab === 'stream' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted uppercase">
                    Stream Provider
                  </label>
                  <select className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary">
                    <option>Apache Kafka</option>
                    <option>AWS Kinesis</option>
                    <option>Azure Event Hub</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted uppercase">
                    Topic / Stream Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary"
                    placeholder="e.g. telemetry-main-01"
                  />
                </div>
              </div>
              <Button className="w-full">Connect Stream</Button>
            </div>
          )}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-text-muted uppercase">
                  Endpoint URL
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary"
                  placeholder="https://api.arais-service.io/v1/ingest"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-text-muted uppercase">
                  Authentication Key
                </label>
                <input
                  type="password"
                  value="************"
                  className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-sm text-text-primary"
                  readOnly
                />
              </div>
              <Button>Generate New Webhook</Button>
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Ingestion Status">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">
                  Active Streams
                </span>
                <Badge variant="normal">3 Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">
                  Daily Volume
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  1.2 TB
                </span>
              </div>
              <Divider />
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Pipeline Health</span>
                  <span className="text-normal">99.9%</span>
                </div>
                <div className="w-full bg-bg-elevated h-1 rounded overflow-hidden">
                  <div
                    className="bg-normal h-full"
                    style={{ width: '99.9%' }}
                  ></div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Recent Activity">
            <div className="space-y-3">
              {[
                { label: 'sensor_data.csv', time: '2m ago', status: 'normal' },
                { label: 'Kafka_Stream_01', time: '15m ago', status: 'active' },
                {
                  label: 'legacy_import.json',
                  time: '1h ago',
                  status: 'anomaly',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium">
                      {item.label}
                    </span>
                    <span className="text-text-muted">{item.time}</span>
                  </div>
                  <Badge variant={item.status}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </motion.div>
  );
};

export default DataIngestionPage;

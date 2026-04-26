import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, AlertTriangle } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import {
  Panel,
  Button,
  StatCard,
  Badge,
} from '../components/ui/BaseComponents';

const driftData = [
  { drift: 'None', t1: 96, t2: 97, t3: 98 },
  { drift: 'Slow', t1: 90, t2: 95, t3: 97 },
  { drift: 'Medium', t1: 81, t2: 90, t3: 95 },
  { drift: 'Fast', t1: 66, t2: 82, t3: 91 },
  { drift: 'Extreme', t1: 51, t2: 71, t3: 86 },
];

const noiseData = [
  { noise: '0%', t1: 97, t2: 97, t3: 98 },
  { noise: '10%', t1: 94, t2: 96, t3: 97 },
  { noise: '20%', t1: 90, t2: 94, t3: 96 },
  { noise: '30%', t1: 84, t2: 91, t3: 94 },
  { noise: '40%', t1: 76, t2: 86, t3: 91 },
  { noise: '50%', t1: 68, t2: 80, t3: 87 },
];

const latencyData = [
  { bucket: '<5ms', count: 41, color: '#0D9488' },
  { bucket: '5-20ms', count: 63, color: '#2563EB' },
  { bucket: '20-50ms', count: 29, color: '#D97706' },
  { bucket: '50-100ms', count: 11, color: '#F97316' },
  { bucket: '>100ms', count: 6, color: '#DC2626' },
];

const coverage = [
  ['Gaussian Noise (20%)', 'check', 'check', 'check'],
  ['Gaussian Noise (40%)', 'check', 'check', 'degraded'],
  ['Slow Concept Drift', 'check', 'check', 'check'],
  ['Fast Concept Drift', 'degraded', 'check', 'check'],
  ['Class Imbalance (95/5)', 'check', 'degraded', 'check'],
  ['Missing Values (10%)', 'check', 'check', 'check'],
  ['Delayed Labels', 'pending', 'pending', 'pending'],
];

export default function EvaluationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Evaluation Engine
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Performance profiles under realistic, stress-tested conditions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-bg-panel border border-border rounded px-3 py-2 text-sm">
            <option>Quick (30s)</option>
            <option>Standard (2min)</option>
            <option>Full Suite (10min)</option>
          </select>
          <Button className="flex items-center gap-2">
            <Play size={14} /> Run Evaluation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Overall Accuracy"
          value="94.2%"
          subtext="91.0% baseline"
        />
        <StatCard
          label="Conditions Tested"
          value="5 / 7"
          subtext="configured"
        />
        <StatCard
          label="Worst-case Accuracy"
          value="71.3%"
          subtext="fast drift"
        />
        <StatCard
          label="Evaluation Runtime"
          value="2m 14s"
          subtext="last run"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Panel
          title="Accuracy Under Concept Drift"
          subtitle="How models degrade as distribution shifts over time"
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
                <XAxis
                  dataKey="drift"
                  tick={{ fontSize: 10 }}
                  stroke="#64748B"
                />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="t1"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  name="Tier 1"
                />
                <Line
                  type="monotone"
                  dataKey="t2"
                  stroke="#2563EB"
                  strokeWidth={2}
                  name="Tier 2"
                />
                <Line
                  type="monotone"
                  dataKey="t3"
                  stroke="#0D9488"
                  strokeWidth={2}
                  name="Tier 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Accuracy vs Noise Level"
          subtitle="Signal-to-noise degradation across model tiers"
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={noiseData}>
                <defs>
                  <linearGradient id="noiseT1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="noiseT2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="noiseT3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
                <XAxis
                  dataKey="noise"
                  tick={{ fontSize: 10 }}
                  stroke="#64748B"
                />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748B" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="t1"
                  stroke="#94A3B8"
                  fill="url(#noiseT1)"
                />
                <Area
                  type="monotone"
                  dataKey="t2"
                  stroke="#2563EB"
                  fill="url(#noiseT2)"
                />
                <Area
                  type="monotone"
                  dataKey="t3"
                  stroke="#0D9488"
                  fill="url(#noiseT3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Inference Latency Distribution"
          subtitle="Latency spread across all inferences in current session"
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
                <XAxis
                  dataKey="bucket"
                  tick={{ fontSize: 10 }}
                  stroke="#64748B"
                />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {latencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-xs text-text-muted font-mono">
            P50: 23ms · P95: 87ms · P99: 234ms · Max: 312ms
          </div>
        </Panel>

        <Panel
          title="Stress Test Coverage"
          subtitle="Which conditions have been evaluated"
        >
          <div className="space-y-3">
            {coverage.map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-[1.6fr_repeat(3,0.5fr)] gap-2 items-center text-xs"
              >
                <div className="text-text-secondary">{row[0]}</div>
                {row.slice(1).map((state, idx) => (
                  <div key={idx} className="flex justify-center">
                    {state === 'check' ? (
                      <CheckCircle size={14} className="text-normal" />
                    ) : state === 'degraded' ? (
                      <AlertTriangle size={14} className="text-uncertain" />
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        title="Evaluation Results"
        subtitle="Showing 15 of 21 results · Filtered by: T2, T3"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-text-muted border-b border-border">
              <tr>
                <th className="text-left p-2">Condition</th>
                <th className="text-left p-2">Model</th>
                <th className="text-right p-2">Precision</th>
                <th className="text-right p-2">Recall</th>
                <th className="text-right p-2">F1</th>
                <th className="text-right p-2">FP Rate</th>
                <th className="text-right p-2">Latency P95</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'Gaussian Noise 20%',
                  'T2',
                  '95.4%',
                  '94.1%',
                  '94.7%',
                  '4.2%',
                  '24ms',
                  'PASS',
                ],
                [
                  'Fast Drift',
                  'T3',
                  '89.2%',
                  '88.7%',
                  '88.9%',
                  '7.1%',
                  '31ms',
                  'DEGRADED',
                ],
                [
                  'Class Imbalance',
                  'T2',
                  '91.5%',
                  '90.2%',
                  '90.8%',
                  '5.9%',
                  '27ms',
                  'PASS',
                ],
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-bg-hover"
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`p-2 ${cellIdx > 1 && cellIdx < 7 ? 'text-right font-mono' : ''}`}
                    >
                      {cellIdx === 7 ? (
                        <Badge
                          variant={cell === 'PASS' ? 'normal' : 'uncertain'}
                        >
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </motion.div>
  );
}

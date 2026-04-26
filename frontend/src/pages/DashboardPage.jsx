import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from 'recharts';
import { Play, Pause, AlertCircle } from 'lucide-react';
import {
  StatCard,
  Button,
  Panel,
  Badge,
} from '../components/ui/BaseComponents';

export default function DashboardPage() {
  const [timelineData, setTimelineData] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  // Generate mock timeline data
  useEffect(() => {
    const data = Array.from({ length: 60 }, (_, i) => ({
      time: `${String(Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}`,
      signal: 50 + Math.random() * 40,
      anomalyScore: Math.random() * 0.3 + (i > 45 ? 0.6 : 0),
      confidence: 0.7 + Math.random() * 0.2,
      oodScore: Math.random() * 0.2,
    }));
    setTimelineData(data);

    // Mock recent events
    setRecentEvents([
      {
        id: 4821,
        time: '13:47:32',
        anomalyScore: 0.87,
        status: 'ANOMALY',
        model: 'T2',
        ood: false,
      },
      {
        id: 4820,
        time: '13:45:12',
        anomalyScore: 0.92,
        status: 'ANOMALY',
        model: 'T2',
        ood: true,
      },
      {
        id: 4819,
        time: '13:42:08',
        anomalyScore: 0.45,
        status: 'NORMAL',
        model: 'T1',
        ood: false,
      },
      {
        id: 4818,
        time: '13:38:45',
        anomalyScore: 0.78,
        status: 'ANOMALY',
        model: 'T3',
        ood: false,
      },
    ]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">
          Real-time system overview and anomaly detection status
        </p>
      </div>

      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Anomalies"
          value="247"
          trend={12}
          subtext="This session"
        />
        <StatCard
          label="Detection Accuracy"
          value="94.2%"
          trend={2}
          subtext="vs baseline"
        />
        <StatCard
          label="OOD Events"
          value="12"
          trend={-5}
          subtext="This session"
        />
        <StatCard label="Avg Latency" value="28ms" subtext="Per inference" />
      </motion.div>

      {/* Two-column layout: Timeline + Health */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-[60%_40%] gap-6"
      >
        {/* Left: Timeline Chart */}
        <Panel
          title="Anomaly Timeline"
          subtitle="Last 60 minutes"
          className="col-span-1"
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timelineData}>
                <defs>
                  <linearGradient
                    id="gradientConfidence"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  stroke="#4B5563"
                />
                <YAxis tick={{ fontSize: 10 }} stroke="#4B5563" />
                <Tooltip
                  contentStyle={{
                    background: '#1E293B',
                    border: '1px solid #2D3F55',
                  }}
                  cursor={{ stroke: '#2563EB' }}
                />
                {/* Anomaly score as bars */}
                <Line
                  type="monotone"
                  dataKey="anomalyScore"
                  stroke="#DC2626"
                  strokeWidth={2}
                  name="Anomaly Score"
                />
                {/* Confidence as area */}
                <Area
                  type="monotone"
                  dataKey="confidence"
                  stroke="#2563EB"
                  fill="url(#gradientConfidence)"
                  name="Confidence"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-text-muted mt-3">
            Showing detection scores and confidence levels over time. Red
            indicates anomaly events.
          </div>
        </Panel>

        {/* Right: Health Gauges + Quick Actions */}
        <div className="space-y-4">
          {/* Model Status */}
          <Panel title="Active Model" header>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">
                  Tier 2 · Medium
                </span>
                <Badge variant="active">ACTIVE</Badge>
              </div>
              <div className="text-xs text-text-muted space-y-1">
                <div>Latency: 28ms</div>
                <div>Accuracy: 91%</div>
                <div>Memory: 84MB</div>
              </div>
            </div>
          </Panel>

          {/* Health Metrics */}
          <Panel title="System Health">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">CPU Load</span>
                  <span className="text-text-secondary font-mono">54%</span>
                </div>
                <div className="h-1 bg-bg-elevated rounded overflow-hidden">
                  <div className="h-full w-[54%] bg-active"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">Memory</span>
                  <span className="text-text-secondary font-mono">
                    2.1 / 8.0 GB
                  </span>
                </div>
                <div className="h-1 bg-bg-elevated rounded overflow-hidden">
                  <div className="h-full w-[26%] bg-active"></div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Quick Actions */}
          <Panel title="Quick Actions">
            <div className="space-y-2">
              <Button className="w-full text-xs">Start Live Analysis</Button>
              <Button className="w-full text-xs" variant="ghost">
                View Recent Events
              </Button>
            </div>
          </Panel>
        </div>
      </motion.div>

      {/* Recent Events Log */}
      <motion.div variants={itemVariants}>
        <Panel title="Recent Events" subtitle="Last 10 anomalies detected">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-border">
                <tr className="text-text-muted">
                  <th className="text-left py-2 px-3">Time</th>
                  <th className="text-left py-2 px-3">Event ID</th>
                  <th className="text-left py-2 px-3">Score</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Model</th>
                  <th className="text-left py-2 px-3">OOD</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((evt, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-bg-hover"
                  >
                    <td className="py-2 px-3 font-mono text-text-muted">
                      {evt.time}
                    </td>
                    <td className="py-2 px-3 font-mono text-active-text">
                      #{evt.id}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-bg-elevated rounded overflow-hidden">
                          <div
                            className={`h-full ${evt.anomalyScore > 0.7 ? 'bg-anomaly' : 'bg-normal'}`}
                            style={{ width: `${evt.anomalyScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-mono">
                          {evt.anomalyScore.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <Badge
                        variant={
                          evt.status === 'ANOMALY' ? 'anomaly' : 'normal'
                        }
                        className="text-xs"
                      >
                        {evt.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 font-mono">{evt.model}</td>
                    <td className="py-2 px-3">{evt.ood ? '⚡' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </motion.div>
    </motion.div>
  );
}

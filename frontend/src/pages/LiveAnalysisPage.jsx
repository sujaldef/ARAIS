import React from 'react';
import { motion } from 'framer-motion';
import { Panel, StatCard, Badge, Button } from '../components/ui/BaseComponents';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  value: Math.sin(i * 0.5) * 10 + Math.random() * 5 + 50,
  uncertainty: 45 + Math.random() * 15,
}));

const LiveAnalysisPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='text-2xl font-bold text-text-primary'>Live Stream Analysis</h1>
          <p className='text-text-secondary'>Real-time inference and anomaly detection.</p>
        </div>
        <div className='flex gap-2'>
           <div className='flex items-center bg-bg-panel border border-border rounded px-2 gap-2'>
             <span className='text-xs font-semibold text-text-muted px-2'>PLAYBACK</span>
             <Button variant='icon' size='sm'>1x</Button>
             <Button variant='icon' size='sm'>2x</Button>
             <Button variant='icon' size='sm' className='text-active'>LIVE</Button>
           </div>
           <Button variant='destructive' size='sm'>Halt Stream</Button>
        </div>
      </div>

      <Panel title="Inference Stream" subtitle="Latency: 12ms | Throughput: 1.2k req/s" className='h-[400px]'>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '4px' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
              <Line type="monotone" dataKey="uncertainty" stroke="#f59e0b" strokeDasharray="5 5" dot={false} isAnimationActive={false} />
            </AreaChart>
         </ResponsiveContainer>
      </Panel>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Panel title="Active Detections">
          <div className='space-y-4'>
            {[
              { type: 'Spike', confidence: '98%', time: '12:04:22', variant: 'anomaly' },
              { type: 'Drift', confidence: '72%', time: '12:04:15', variant: 'uncertain' },
              { type: 'Pattern', confidence: '85%', time: '12:03:50', variant: 'normal' }
            ].map((d, i) => (
              <div key={i} className='flex items-center justify-between p-2 rounded bg-bg-elevated border border-border'>
                <div>
                  <div className='text-sm font-semibold text-text-primary'>{d.type} Detected</div>
                  <div className='text-xs text-text-muted'>{d.time}</div>
                </div>
                <Badge variant={d.variant}>{d.confidence}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Schema Profiler">
           <div className='space-y-3'>
             {['temperature', 'pressure', 'vibration'].map((field) => (
               <div key={field} className='space-y-1'>
                 <div className='flex justify-between text-xs'>
                   <span className='capitalize text-text-secondary'>{field}</span>
                   <span className='text-text-muted'>Valid</span>
                 </div>
                 <div className='h-1.5 w-full bg-bg-elevated rounded overflow-hidden'>
                   <div className='bg-active h-full' style={{ width: '100%' }}></div>
                 </div>
               </div>
             ))}
           </div>
        </Panel>

        <Panel title="System Resources">
           <div className='grid grid-cols-2 gap-4'>
              <div className='text-center p-3 rounded bg-bg-elevated'>
                <div className='text-2xl font-bold text-active'>8%</div>
                <div className='text-[10px] text-text-muted uppercase'>CPU Load</div>
              </div>
              <div className='text-center p-3 rounded bg-bg-elevated'>
                <div className='text-2xl font-bold text-normal'>2.4GB</div>
                <div className='text-[10px] text-text-muted uppercase'>Memory</div>
              </div>
              <div className='text-center p-3 rounded bg-bg-elevated'>
                <div className='text-2xl font-bold text-text-primary'>12ms</div>
                <div className='text-[10px] text-text-muted uppercase'>Inference</div>
              </div>
              <div className='text-center p-3 rounded bg-bg-elevated'>
                <div className='text-2xl font-bold text-text-primary'>0.02%</div>
                <div className='text-[10px] text-text-muted uppercase'>Drop Rate</div>
              </div>
           </div>
        </Panel>
      </div>
    </motion.div>
  );
};

export default LiveAnalysisPage;
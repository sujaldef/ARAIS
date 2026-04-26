import React from 'react';
import { motion } from 'framer-motion';
import { Panel, Badge, Button, Divider } from '../components/ui/BaseComponents';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const modelPool = [
  { name: 'X-Gen 4.2 Large', status: 'Active', version: '4.2.0', accuracy: 0.96, cost: 0.82, latency: '42ms' },
  { name: 'ARAIS Core Distil', status: 'Standby', version: '2.1.5', accuracy: 0.88, cost: 0.15, latency: '8ms' },
  { name: 'Legacy Ensemble', status: 'Shadow', version: '1.0.1', accuracy: 0.92, cost: 0.45, latency: '24ms' },
];

const scatterData = [
  { x: 10, y: 92, name: 'Distil-1', size: 20 },
  { x: 25, y: 94, name: 'Distil-2', size: 30 },
  { x: 45, y: 96, name: 'X-Gen 4', size: 50 },
  { x: 50, y: 95, name: 'X-Gen 4.2', size: 60 },
  { x: 80, y: 98, name: 'Ensemble-B', size: 80 },
];

const ModelControlPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div>
        <h1 className='text-2xl font-bold text-text-primary'>Model Orchestration</h1>
        <p className='text-text-secondary'>Manage the active model pool and inference logic.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
         {modelPool.map((model, i) => (
           <Panel key={i} title={model.name} headerStripColor={model.status === 'Active' ? 'bg-active/20' : 'bg-bg-elevated'}>
             <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-text-muted uppercase'>Version</span>
                  <span className='text-sm text-text-primary px-2 py-0.5 bg-bg-elevated rounded'>{model.version}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-text-muted uppercase'>Status</span>
                  <Badge variant={model.status === 'Active' ? 'active' : 'inactive'}>{model.status}</Badge>
                </div>
                <Divider />
                <div className='grid grid-cols-2 gap-2 text-center'>
                   <div className='p-2 bg-bg-elevated rounded'>
                     <div className='text-sm font-bold text-text-primary'>{model.accuracy * 100}%</div>
                     <div className='text-[10px] text-text-muted uppercase'>Accuracy</div>
                   </div>
                   <div className='p-2 bg-bg-elevated rounded'>
                     <div className='text-sm font-bold text-text-primary'>{model.latency}</div>
                     <div className='text-[10px] text-text-muted uppercase'>Latency</div>
                   </div>
                </div>
                <div className='pt-2'>
                   <Button variant={model.status === 'Active' ? 'ghost' : 'primary'} className='w-full' size='sm'>
                      {model.status === 'Active' ? 'Deactivate' : 'Promote to Production'}
                   </Button>
                </div>
             </div>
           </Panel>
         ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Panel title="Cost-Accuracy Frontier" subtitle="Analysis of cost vs performance for active models">
           <div className='h-[300px]'>
             <ResponsiveContainer width="100%" height="100%">
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                 <XAxis type="number" dataKey="x" name="Cost" unit="c" stroke="#666" />
                 <YAxis type="number" dataKey="y" name="Accuracy" unit="%" stroke="#666" domain={[90, 100]} />
                 <ZAxis type="number" dataKey="size" range={[60, 400]} />
                 <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                 <Scatter name="Models" data={scatterData} fill="#3b82f6" />
               </ScatterChart>
             </ResponsiveContainer>
           </div>
        </Panel>

        <Panel title="Orchestration Rules" subtitle="Automated traffic steering policies">
           <div className='space-y-4'>
             {[
               { rule: 'Low Latency Mode', desc: 'Route to Distil models if latency > 100ms', active: true },
               { rule: 'High Precision Check', desc: 'Dual-inference on certainty < 0.8', active: true },
               { rule: 'Shadow Validation', desc: 'Mirror 5% traffic to v4.2.1-rc1', active: false }
             ].map((rule, i) => (
               <div key={i} className='flex items-start justify-between p-3 border border-border rounded shadow-sm hover:border-active transition-colors'>
                 <div>
                   <div className='text-sm font-semibold text-text-primary'>{rule.rule}</div>
                   <div className='text-xs text-text-muted'>{rule.desc}</div>
                 </div>
                 <input type='checkbox' checked={rule.active} readOnly className='form-checkbox h-4 w-4 bg-bg-elevated border-border text-active rounded' />
               </div>
             ))}
             <Button variant='ghost' className='w-full'>Add Logic Segment</Button>
           </div>
        </Panel>
      </div>
    </motion.div>
  );
};

export default ModelControlPage;
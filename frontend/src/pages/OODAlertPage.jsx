import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel, Table, Badge, Button, Divider } from '../components/ui/BaseComponents';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const alertData = [
  { id: 'AL-901', time: '12:45:01', type: 'Conceptual Drift', score: 0.89, status: 'Open' },
  { id: 'AL-902', time: '12:44:12', type: 'Feature Outlier', score: 0.94, status: 'In Review' },
  { id: 'AL-903', time: '12:40:55', type: 'Novel Input', score: 0.72, status: 'Closed' },
  { id: 'AL-904', time: '12:38:20', type: 'Schema Violation', score: 0.98, status: 'Open' },
];

const distributionData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 10,
  y: Math.random() * 10,
  isOOD: Math.random() > 0.8
}));

const OODAlertPage = () => {
  const [selectedAlert, setSelectedAlert] = useState(alertData[0]);

  const columns = [
    { key: 'id', label: 'Alert ID' },
    { key: 'type', label: 'Category' },
    { key: 'score', label: 'OOD Score', render: (val) => <span className='font-mono font-bold text-active'>{val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Open' ? 'anomaly' : 'neutral'}>{val}</Badge> }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div>
        <h1 className='text-2xl font-bold text-text-primary'>Out-of-Distribution Monitoring</h1>
        <p className='text-text-secondary'>Detect and investigate inputs that deviate from training distributions.</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
           <Panel title="Alert Log">
             <div className='flex gap-2 mb-4'>
                <Button variant='ghost' size='sm'>Filter: All Types</Button>
                <Button variant='ghost' size='sm'>Sort: Newest</Button>
             </div>
             <Table 
               columns={columns} 
               data={alertData} 
               onRowClick={(row) => setSelectedAlert(row)}
               selectedRow={alertData.findIndex(a => a.id === selectedAlert.id)}
             />
           </Panel>

           <Panel title="Latent Space Distribution" subtitle="Last 500 samples mapped via T-SNE">
              <div className='h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" dataKey="x" hide />
                    <YAxis type="number" dataKey="y" hide />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Normal" data={distributionData.filter(d => !d.isOOD)} fill="#3b82f6" fillOpacity={0.4} />
                    <Scatter name="OOD" data={distributionData.filter(d => d.isOOD)} fill="#ef4444" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
           </Panel>
        </div>

        <div className='space-y-6'>
           <Panel title="Event Details" headerStripColor='bg-anomaly/20'>
              {selectedAlert ? (
                <div className='space-y-4'>
                   <div>
                     <label className='text-[10px] text-text-muted uppercase font-bold'>Event Reference</label>
                     <div className='text-lg font-mono text-text-primary'>{selectedAlert.id}</div>
                   </div>
                   <div>
                     <label className='text-[10px] text-text-muted uppercase font-bold'>Trigger Time</label>
                     <div className='text-sm text-text-secondary'>{selectedAlert.time} (UTC)</div>
                   </div>
                   <Divider />
                   <div>
                      <label className='text-[10px] text-text-muted uppercase font-bold'>Reasoning</label>
                      <p className='text-sm text-text-secondary mt-1'>
                        Vector distance to nearest centroid exceeded threshold (T=0.85). 
                        Input features 'temp_k' and 'vibration_rms' showing 4.2 sigma deviation.
                      </p>
                   </div>
                   <div className='pt-4 flex flex-col gap-2'>
                      <Button className='w-full'>Acknowledge</Button>
                      <Button variant='ghost' className='w-full'>Export Telemetry</Button>
                      <Button variant='destructive' className='w-full'>Retrain Trigger</Button>
                   </div>
                </div>
              ) : (
                <div className='text-center py-12 text-text-muted italic'>Select an alert to view details</div>
              )}
           </Panel>

           <Panel title="Sensitivity Controls">
              <div className='space-y-4'>
                 <div className='space-y-2'>
                    <div className='flex justify-between text-xs'>
                       <span className='text-text-secondary'>Global Threshold</span>
                       <span className='text-active'>0.85</span>
                    </div>
                    <input type='range' className='w-full accent-active' />
                 </div>
                 <div className='flex items-center justify-between'>
                    <span className='text-sm text-text-secondary'>Auto-Quarantine</span>
                    <input type='checkbox' checked readOnly className='form-checkbox h-4 w-4 bg-bg-elevated border-border text-active rounded' />
                 </div>
              </div>
           </Panel>
        </div>
      </div>
    </motion.div>
  );
};

export default OODAlertPage;
import { useEffect, useState } from 'react';

import PageCard from '../components/PageCard';
import StatTile from '../components/StatTile';
import StatusBadge from '../components/StatusBadge';
import { getHealth, getIngestionStatus, getMetrics } from '../lib/api';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '0.7rem',
};

const stackStyles = {
  display: 'grid',
  gap: '1rem',
};

function OverviewPage() {
  const [health, setHealth] = useState(null);
  const [ingestion, setIngestion] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setError('');
        const [healthRes, ingestionRes, metricRes] = await Promise.all([
          getHealth(),
          getIngestionStatus(),
          getMetrics(),
        ]);

        if (!mounted) {
          return;
        }

        setHealth(healthRes);
        setIngestion(ingestionRes);
        setMetrics(metricRes);
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load overview data.');
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={stackStyles}>
      <PageCard title="Backend Link Status">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <StatusBadge
            text={health?.status === 'ok' ? 'API healthy' : 'Checking API'}
            tone={health?.status === 'ok' ? 'success' : 'neutral'}
          />
          <StatusBadge
            text={
              ingestion?.status === 'ready'
                ? 'Ingestion ready'
                : 'Ingestion unknown'
            }
            tone={ingestion?.status === 'ready' ? 'success' : 'neutral'}
          />
        </div>
        {error ? (
          <p style={{ color: '#9a2e1f', marginTop: '0.7rem' }}>{error}</p>
        ) : null}
      </PageCard>

      <PageCard title="Live Snapshot">
        <div style={gridStyles}>
          <StatTile
            label="Total inferences"
            value={metrics?.total_inferences ?? '-'}
          />
          <StatTile
            label="Anomaly count"
            value={metrics?.anomaly_count ?? '-'}
          />
          <StatTile
            label="Avg latency (ms)"
            value={
              typeof metrics?.average_latency_ms === 'number'
                ? metrics.average_latency_ms.toFixed(2)
                : '-'
            }
          />
        </div>
      </PageCard>

      <PageCard title="Architecture Alignment">
        <p style={{ margin: 0, lineHeight: 1.5 }}>
          This frontend is split by pages for operator workflows and shared
          components for shell, cards, and status indicators. Each page maps
          directly to backend capability areas: health and status, inference,
          evaluation metrics, and feedback.
        </p>
      </PageCard>
    </div>
  );
}

export default OverviewPage;

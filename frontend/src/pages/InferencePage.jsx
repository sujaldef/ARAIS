import { useMemo, useState } from 'react';

import PageCard from '../components/PageCard';
import StatusBadge from '../components/StatusBadge';
import { runInference } from '../lib/api';

const layoutStyles = {
  display: 'grid',
  gap: '1rem',
};

const inputStyles = {
  width: '100%',
  minHeight: 130,
  border: '1px solid #d8c7a2',
  borderRadius: 12,
  padding: '0.7rem 0.8rem',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
  background: '#fffdf8',
};

function parseNumericInput(raw) {
  return raw
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
}

function InferencePage() {
  const [rawValues, setRawValues] = useState(
    '0.2, 0.23, 0.28, 0.9, 0.31, 0.27, 2.2',
  );
  const [riskTier, setRiskTier] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const parsedValues = useMemo(() => parseNumericInput(rawValues), [rawValues]);

  async function onSubmit(event) {
    event.preventDefault();

    if (!parsedValues.length) {
      setError('Please provide at least one valid numeric value.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await runInference(parsedValues, riskTier);
      setResult(response);
    } catch (err) {
      setError(err.message || 'Inference request failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={layoutStyles}>
      <PageCard title="Inference Request">
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
          <label htmlFor="values-input" style={{ fontWeight: 600 }}>
            Numeric sequence (comma or space separated)
          </label>
          <textarea
            id="values-input"
            value={rawValues}
            onChange={(event) => setRawValues(event.target.value)}
            style={inputStyles}
          />

          <div
            style={{
              display: 'flex',
              gap: '0.8rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <label htmlFor="risk-tier" style={{ fontWeight: 600 }}>
              Risk tier
            </label>
            <select
              id="risk-tier"
              value={riskTier}
              onChange={(event) => setRiskTier(event.target.value)}
              style={{
                border: '1px solid #d6c49b',
                borderRadius: 10,
                padding: '0.45rem 0.6rem',
                background: '#fff8e9',
              }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              style={{
                border: '1px solid #a77f0b',
                borderRadius: 10,
                background: loading ? '#edd99d' : '#e2b633',
                color: '#2c1d00',
                fontWeight: 700,
                padding: '0.5rem 0.8rem',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Running...' : 'Run Inference'}
            </button>
          </div>
          <small>Parsed values count: {parsedValues.length}</small>
          {error ? (
            <p style={{ margin: 0, color: '#9f2c18' }}>{error}</p>
          ) : null}
        </form>
      </PageCard>

      <PageCard title="Inference Response">
        {!result ? (
          <p style={{ margin: 0 }}>
            Run a request to see anomaly details from backend.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <StatusBadge
                text={result.anomaly ? 'Anomaly detected' : 'Normal'}
                tone={result.anomaly ? 'danger' : 'success'}
              />
              <StatusBadge
                text={result.risk_level}
                tone={result.risk_level === 'RELIABLE' ? 'success' : 'danger'}
              />
              <StatusBadge
                text={`Model: ${result.model_used}`}
                tone="neutral"
              />
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.8rem',
                borderRadius: 10,
                border: '1px solid #e1d3b4',
                background: '#fffef8',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </PageCard>
    </div>
  );
}

export default InferencePage;

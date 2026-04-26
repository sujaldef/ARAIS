import { useState } from 'react';

import PageCard from '../components/PageCard';
import StatusBadge from '../components/StatusBadge';
import { submitFeedback } from '../lib/api';

function FeedbackPage() {
  const [inferenceId, setInferenceId] = useState('');
  const [correctedAnomaly, setCorrectedAnomaly] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    if (!comment.trim()) {
      setError('Comment is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');
      await submitFeedback(
        inferenceId ? Number(inferenceId) : null,
        correctedAnomaly,
        comment.trim(),
      );
      setMessage('Feedback submitted and queued for learning.');
      setComment('');
    } catch (err) {
      setError(err.message || 'Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <PageCard title="Submit Feedback">
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
          <label htmlFor="inference-id" style={{ fontWeight: 600 }}>
            Inference ID (optional)
          </label>
          <input
            id="inference-id"
            type="number"
            min="1"
            value={inferenceId}
            onChange={(event) => setInferenceId(event.target.value)}
            placeholder="e.g. 42"
            style={{
              border: '1px solid #d7c69e',
              borderRadius: 10,
              padding: '0.5rem 0.6rem',
              background: '#fffef8',
            }}
          />

          <label htmlFor="feedback-comment" style={{ fontWeight: 600 }}>
            Correction comment
          </label>
          <textarea
            id="feedback-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={5}
            placeholder="Explain why the result should be corrected"
            style={{
              border: '1px solid #d7c69e',
              borderRadius: 10,
              padding: '0.6rem 0.7rem',
              background: '#fffef8',
            }}
          />

          <label
            style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}
          >
            <input
              type="checkbox"
              checked={correctedAnomaly}
              onChange={(event) => setCorrectedAnomaly(event.target.checked)}
            />
            Corrected anomaly value is TRUE
          </label>

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
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </PageCard>

      <PageCard title="Submission State">
        {!message && !error ? (
          <p style={{ margin: 0 }}>No submission yet.</p>
        ) : null}
        {message ? <StatusBadge text={message} tone="success" /> : null}
        {error ? <StatusBadge text={error} tone="danger" /> : null}
      </PageCard>
    </div>
  );
}

export default FeedbackPage;

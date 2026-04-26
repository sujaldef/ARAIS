const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.detail || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function getHealth() {
  return request('/api/health');
}

export async function getIngestionStatus() {
  return request('/api/ingestion/status');
}

export async function runInference(values, riskTier) {
  return request('/api/inference', {
    method: 'POST',
    body: JSON.stringify({
      values,
      risk_tier: riskTier,
    }),
  });
}

export async function getMetrics() {
  return request('/api/evaluation/metrics');
}

export async function submitFeedback(inferenceId, correctedAnomaly, comment) {
  return request('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({
      inference_id: inferenceId,
      corrected_anomaly: correctedAnomaly,
      comment,
    }),
  });
}

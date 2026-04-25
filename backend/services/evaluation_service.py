from __future__ import annotations

from middleware.db import fetch_metrics
from model.schemas import EvaluationMetrics


class EvaluationService:
    def get_metrics(self) -> EvaluationMetrics:
        total, anomalies, avg_latency = fetch_metrics()
        return EvaluationMetrics(
            total_inferences=total,
            anomaly_count=anomalies,
            average_latency_ms=avg_latency,
        )

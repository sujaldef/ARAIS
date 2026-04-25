from __future__ import annotations


class OrchestratorService:
    def __init__(self, latency_budget_ms: int) -> None:
        self.latency_budget_ms = latency_budget_ms

    def select_model(self, risk_tier: str, value_count: int, recent_latency_ms: int = 0) -> str:
        if recent_latency_ms > self.latency_budget_ms:
            return "statistical_fast"
        if risk_tier == "HIGH" and value_count < 5000:
            return "lstm_heavy"
        if value_count > 10000:
            return "statistical_fast"
        return "iforest_medium"

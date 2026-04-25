from __future__ import annotations

from config.settings import settings
from services.orchestrator_service import OrchestratorService


class ModelController:
    def __init__(self) -> None:
        self.orchestrator = OrchestratorService(settings.latency_budget_ms)

    def select(self, risk_tier: str, value_count: int, recent_latency_ms: int = 0) -> str:
        return self.orchestrator.select_model(risk_tier, value_count, recent_latency_ms)

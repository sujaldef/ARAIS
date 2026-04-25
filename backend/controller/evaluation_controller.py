from __future__ import annotations

from model.schemas import EvaluationMetrics
from services.evaluation_service import EvaluationService


class EvaluationController:
    def __init__(self) -> None:
        self.service = EvaluationService()

    def metrics(self) -> EvaluationMetrics:
        return self.service.get_metrics()

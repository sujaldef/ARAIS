from __future__ import annotations

from fastapi import APIRouter

from controller.evaluation_controller import EvaluationController
from model.schemas import EvaluationMetrics

router = APIRouter(prefix="/evaluation", tags=["evaluation"])
controller = EvaluationController()


@router.get("/metrics", response_model=EvaluationMetrics)
def get_metrics() -> EvaluationMetrics:
    return controller.metrics()

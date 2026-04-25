from __future__ import annotations

from fastapi import APIRouter

from controller.pipeline_controller import PipelineController
from model.schemas import InferenceRequest, InferenceResponse

router = APIRouter(prefix="/inference", tags=["inference"])
controller = PipelineController()


@router.post("", response_model=InferenceResponse)
def infer(payload: InferenceRequest) -> InferenceResponse:
    return controller.predict(payload)

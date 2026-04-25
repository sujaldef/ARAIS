from __future__ import annotations

from model.schemas import InferenceRequest, InferenceResponse
from services.pipeline.data_pipeline import DataPipeline


class PipelineController:
    def __init__(self) -> None:
        self.pipeline = DataPipeline()

    def predict(self, payload: InferenceRequest) -> InferenceResponse:
        return self.pipeline.run(payload)

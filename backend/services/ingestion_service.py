from __future__ import annotations

from model.schemas import InferenceRequest
from utils.exceptions import DataIngestionError


class IngestionService:
    def ingest(self, payload: InferenceRequest) -> list[float]:
        if not payload.values:
            raise DataIngestionError("Input values cannot be empty.")
        return payload.values

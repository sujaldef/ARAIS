from __future__ import annotations

from datetime import datetime, timezone
from time import perf_counter

from config.settings import settings
from middleware.db import insert_prediction
from model.schemas import InferenceRequest, InferenceResponse
from services.ingestion_service import IngestionService
from services.ml_engine.inference import InferenceEngine
from services.ml_engine.uncertainty import UncertaintyService
from services.ood_detection_service import OODDetectionService
from services.orchestrator_service import OrchestratorService
from services.parsing_service import ParsingService
from services.preprocessing_service import PreprocessingService
from services.pipeline.validators import validate_risk_tier


class DataPipeline:
    def __init__(self) -> None:
        self.ingestion = IngestionService()
        self.parsing = ParsingService()
        self.preprocessing = PreprocessingService()
        self.ood = OODDetectionService(settings.ood_threshold)
        self.orchestrator = OrchestratorService(settings.latency_budget_ms)
        self.inference_engine = InferenceEngine()
        self.uncertainty = UncertaintyService()

    def run(self, payload: InferenceRequest) -> InferenceResponse:
        validate_risk_tier(payload.risk_tier)

        start = perf_counter()
        raw_values = self.ingestion.ingest(payload)
        parsed = self.parsing.parse(raw_values)
        prepared = self.preprocessing.preprocess(parsed)

        ood_flag, ood_score = self.ood.detect(prepared)
        model_name = self.orchestrator.select_model(payload.risk_tier, prepared["count"])
        anomaly, confidence = self.inference_engine.run(model_name, prepared["normalized"])

        uncertainty, risk_level = self.uncertainty.estimate(confidence, ood_flag)
        latency_ms = int((perf_counter() - start) * 1000)

        response = InferenceResponse(
            anomaly=anomaly,
            confidence=round(confidence, 4),
            uncertainty=uncertainty,
            risk_level=risk_level,
            ood_flag=ood_flag,
            ood_score=round(ood_score, 4),
            model_used=model_name,
            timestamp=datetime.now(tz=timezone.utc),
            processing_latency_ms=latency_ms,
        )

        insert_prediction(payload.model_dump(), response.model_dump())
        return response

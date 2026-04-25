from __future__ import annotations

from services.ml_engine.base_detector import BaseDetector


class StatisticalFastDetector(BaseDetector):
    name = "statistical_fast"

    def predict(self, normalized_values: list[float]) -> tuple[bool, float]:
        score = max(abs(v) for v in normalized_values)
        anomaly = score > 2.0
        confidence = min(0.99, 0.55 + (score / 6.0))
        return anomaly, confidence


class IForestMediumDetector(BaseDetector):
    name = "iforest_medium"

    def predict(self, normalized_values: list[float]) -> tuple[bool, float]:
        score = sum(abs(v) for v in normalized_values) / max(len(normalized_values), 1)
        anomaly = score > 1.4
        confidence = min(0.99, 0.6 + (score / 5.0))
        return anomaly, confidence


class LstmHeavyDetector(BaseDetector):
    name = "lstm_heavy"

    def predict(self, normalized_values: list[float]) -> tuple[bool, float]:
        peak = max(abs(v) for v in normalized_values)
        drift = abs(sum(normalized_values) / max(len(normalized_values), 1))
        score = (peak * 0.7) + (drift * 0.3)
        anomaly = score > 1.8
        confidence = min(0.995, 0.65 + (score / 6.5))
        return anomaly, confidence


class ModelPool:
    def __init__(self) -> None:
        self._models: dict[str, BaseDetector] = {
            "statistical_fast": StatisticalFastDetector(),
            "iforest_medium": IForestMediumDetector(),
            "lstm_heavy": LstmHeavyDetector(),
        }

    def get(self, model_name: str) -> BaseDetector:
        return self._models[model_name]

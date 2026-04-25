from __future__ import annotations

from services.ml_engine.model_pool import ModelPool


class InferenceEngine:
    def __init__(self) -> None:
        self.model_pool = ModelPool()

    def run(self, model_name: str, normalized_values: list[float]) -> tuple[bool, float]:
        model = self.model_pool.get(model_name)
        return model.predict(normalized_values)

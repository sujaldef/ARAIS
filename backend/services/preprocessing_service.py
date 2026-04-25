from __future__ import annotations

from utils.exceptions import PreprocessingError


class PreprocessingService:
    def preprocess(self, parsed: dict) -> dict:
        values = parsed["values"]
        mean = parsed["mean"]
        variance = sum((v - mean) ** 2 for v in values) / max(len(values), 1)
        std = variance ** 0.5
        if std == 0:
            raise PreprocessingError("Input variance is zero; cannot normalize.")

        normalized = [(v - mean) / std for v in values]
        return {
            "normalized": normalized,
            "mean": mean,
            "std": std,
            "count": parsed["count"],
        }

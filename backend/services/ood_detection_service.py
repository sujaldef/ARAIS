from __future__ import annotations


class OODDetectionService:
    def __init__(self, threshold: float) -> None:
        self.threshold = threshold

    def detect(self, preprocessed: dict) -> tuple[bool, float]:
        # Lightweight proxy: if max normalized deviation is very high, treat as OOD.
        score = max(abs(v) for v in preprocessed["normalized"])
        return score > self.threshold, float(score)

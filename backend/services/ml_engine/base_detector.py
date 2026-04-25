from __future__ import annotations

from abc import ABC, abstractmethod


class BaseDetector(ABC):
    name: str

    @abstractmethod
    def predict(self, normalized_values: list[float]) -> tuple[bool, float]:
        """Return (anomaly, confidence)."""

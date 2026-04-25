from __future__ import annotations


class UncertaintyService:
    def estimate(self, confidence: float, ood_flag: bool) -> tuple[float, str]:
        uncertainty = 1.0 - confidence
        if ood_flag:
            uncertainty = min(1.0, uncertainty + 0.2)
        risk = "RELIABLE" if uncertainty < 0.35 else "UNCERTAIN"
        return round(uncertainty, 4), risk

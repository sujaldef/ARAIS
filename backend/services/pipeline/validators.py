from __future__ import annotations

from model.constants import RISK_TIERS
from utils.exceptions import DataIngestionError


def validate_risk_tier(risk_tier: str) -> None:
    if risk_tier not in RISK_TIERS:
        raise DataIngestionError(f"Invalid risk tier '{risk_tier}'.")

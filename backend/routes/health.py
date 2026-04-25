from __future__ import annotations

from fastapi import APIRouter

from config.settings import settings
from model.schemas import HealthResponse

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", version=settings.app_version, db_ready=True)

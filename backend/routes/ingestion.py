from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/ingestion", tags=["ingestion"])


@router.get("/status")
def ingestion_status() -> dict[str, str]:
    return {"status": "ready"}

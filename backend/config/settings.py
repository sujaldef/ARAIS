from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = Field(default="ARAIS Backend")
    app_version: str = Field(default="1.0.0")
    app_description: str = Field(default="Adaptive anomaly detection backend API")
    api_prefix: str = Field(default="/api")

    database_url: str = Field(default="sqlite:///./data/arais.db", alias="DATABASE_URL")

    latency_budget_ms: int = Field(default=50)
    ood_threshold: float = Field(default=2.5)
    default_risk_tier: str = Field(default="MEDIUM")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

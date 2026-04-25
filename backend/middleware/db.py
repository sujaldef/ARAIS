from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from config.settings import settings


def _db_path() -> Path:
    if not settings.database_url.startswith("sqlite:///"):
        raise ValueError("Only sqlite DATABASE_URL is supported.")
    return Path(settings.database_url.replace("sqlite:///", "", 1))


def init_db() -> None:
    db_path = _db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(db_path) as conn:
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                input_json TEXT NOT NULL,
                output_value REAL NOT NULL,
                confidence REAL NOT NULL,
                uncertainty REAL NOT NULL,
                model_used TEXT NOT NULL,
                ood_flag INTEGER NOT NULL,
                ood_score REAL NOT NULL,
                latency_ms INTEGER NOT NULL
            );
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                inference_id INTEGER,
                corrected_anomaly INTEGER NOT NULL,
                comment TEXT NOT NULL
            );
            """
        )
        conn.commit()


@contextmanager
def get_db_connection() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(_db_path())
    try:
        yield conn
    finally:
        conn.close()


def insert_prediction(payload: dict, output: dict) -> int:
    with get_db_connection() as conn:
        cur = conn.execute(
            """
            INSERT INTO predictions (
                input_json, output_value, confidence, uncertainty,
                model_used, ood_flag, ood_score, latency_ms
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                json.dumps(payload),
                1.0 if output["anomaly"] else 0.0,
                output["confidence"],
                output["uncertainty"],
                output["model_used"],
                1 if output["ood_flag"] else 0,
                output["ood_score"],
                output["processing_latency_ms"],
            ),
        )
        conn.commit()
        return int(cur.lastrowid)


def insert_feedback(inference_id: int | None, corrected_anomaly: bool, comment: str) -> None:
    with get_db_connection() as conn:
        conn.execute(
            """
            INSERT INTO feedback (inference_id, corrected_anomaly, comment)
            VALUES (?, ?, ?)
            """,
            (inference_id, 1 if corrected_anomaly else 0, comment),
        )
        conn.commit()


def fetch_metrics() -> tuple[int, int, float]:
    with get_db_connection() as conn:
        cur = conn.execute(
            """
            SELECT COUNT(*), COALESCE(SUM(output_value), 0), COALESCE(AVG(latency_ms), 0)
            FROM predictions
            """
        )
        total, anomalies, avg_latency = cur.fetchone()
    return int(total), int(anomalies), float(avg_latency)

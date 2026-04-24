from __future__ import annotations

import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator


def _db_path_from_env() -> Path:
	raw_url = os.getenv("DATABASE_URL", "sqlite:///./arais.db")
	if not raw_url.startswith("sqlite:///"):
		raise ValueError("Only sqlite DATABASE_URL is supported in this setup.")
	db_relative_path = raw_url.replace("sqlite:///", "", 1)
	return Path(db_relative_path)


def init_db() -> None:
	db_path = _db_path_from_env()
	db_path.parent.mkdir(parents=True, exist_ok=True)

	with sqlite3.connect(db_path) as conn:
		conn.execute("PRAGMA journal_mode=WAL;")
		conn.execute(
			"""
			CREATE TABLE IF NOT EXISTS predictions (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				created_at TEXT DEFAULT CURRENT_TIMESTAMP,
				input_json TEXT NOT NULL,
				output_value REAL NOT NULL
			);
			"""
		)
		conn.commit()


@contextmanager
def get_db_connection() -> Iterator[sqlite3.Connection]:
	db_path = _db_path_from_env()
	conn = sqlite3.connect(db_path)
	try:
		yield conn
	finally:
		conn.close()

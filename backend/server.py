import os

from dotenv import load_dotenv
from fastapi import FastAPI

from middelware.db import init_db
from routes.health import router as health_router
from routes.predict import router as predict_router

load_dotenv()

app = FastAPI(
	title=os.getenv("APP_NAME", "ARAIS Backend"),
	version="1.0.0",
	description="ML-oriented backend API for ARAIS.",
)

app.include_router(health_router)
app.include_router(predict_router)


@app.on_event("startup")
def startup_event() -> None:
	init_db()

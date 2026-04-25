from fastapi import FastAPI

from config.logging import setup_logging
from config.settings import settings
from middleware.cors import add_cors
from middleware.db import init_db
from middleware.error_handler import register_error_handlers
from routes.evaluation import router as evaluation_router
from routes.feedback import router as feedback_router
from routes.health import router as health_router
from routes.inference import router as inference_router
from routes.ingestion import router as ingestion_router

app = FastAPI(
	title=settings.app_name,
	version=settings.app_version,
	description=settings.app_description,
)

setup_logging()
add_cors(app)
register_error_handlers(app)

app.include_router(health_router, prefix=settings.api_prefix)
app.include_router(ingestion_router, prefix=settings.api_prefix)
app.include_router(inference_router, prefix=settings.api_prefix)
app.include_router(evaluation_router, prefix=settings.api_prefix)
app.include_router(feedback_router, prefix=settings.api_prefix)


@app.on_event("startup")
def startup_event() -> None:
	init_db()

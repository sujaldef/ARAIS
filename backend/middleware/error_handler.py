from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from utils.exceptions import AraisException


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AraisException)
    async def arais_error_handler(_: Request, exc: AraisException) -> JSONResponse:
        return JSONResponse(status_code=400, content={"detail": str(exc)})

    @app.exception_handler(Exception)
    async def generic_error_handler(_: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(status_code=500, content={"detail": f"Internal error: {exc}"})

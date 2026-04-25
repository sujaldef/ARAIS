from __future__ import annotations

from fastapi import APIRouter

from controller.feedback_controller import FeedbackController
from model.schemas import FeedbackRequest, FeedbackResponse

router = APIRouter(prefix="/feedback", tags=["feedback"])
controller = FeedbackController()


@router.post("", response_model=FeedbackResponse)
def submit_feedback(payload: FeedbackRequest) -> FeedbackResponse:
    controller.submit(payload)
    return FeedbackResponse(status="accepted")

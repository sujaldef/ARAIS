from __future__ import annotations

from model.schemas import FeedbackRequest
from services.feedback_service import FeedbackService


class FeedbackController:
    def __init__(self) -> None:
        self.service = FeedbackService()

    def submit(self, payload: FeedbackRequest) -> None:
        self.service.submit_feedback(payload)

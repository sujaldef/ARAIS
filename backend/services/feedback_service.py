from __future__ import annotations

from middleware.db import insert_feedback
from model.schemas import FeedbackRequest


class FeedbackService:
    def submit_feedback(self, payload: FeedbackRequest) -> None:
        insert_feedback(payload.inference_id, payload.corrected_anomaly, payload.comment)

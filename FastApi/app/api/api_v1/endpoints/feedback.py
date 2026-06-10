from typing import Any
from fastapi import APIRouter, Depends
from sqlmodel import Session
from ....db.database import get_session
from ....models.models import Feedback
from ....schemas.schemas import FeedbackCreate
from ...deps import get_current_user

router = APIRouter()

@router.post("/")
def create_feedback(
    *,
    db: Session = Depends(get_session),
    feedback_in: FeedbackCreate,
    current_user: Any = Depends(get_current_user),
) -> Any:
    db_obj = Feedback(
        user_id=current_user.id,
        food_item_id=feedback_in.food_item_id,
        rating=feedback_in.rating,
        comment=feedback_in.comment
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

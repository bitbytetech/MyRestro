from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ....db.database import get_session
from ....models.models import FoodItem, FoodImage, FoodVariant
from ....schemas.schemas import FoodItemCreate, FoodItemRead
from ...deps import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[FoodItemRead])
def read_food_items(
    db: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    food_items = db.exec(select(FoodItem).offset(skip).limit(limit)).all()
    return food_items

@router.post("/", response_model=FoodItemRead)
def create_food_item(
    *,
    db: Session = Depends(get_session),
    food_in: FoodItemCreate,
    current_admin: Any = Depends(get_current_admin),
) -> Any:
    db_obj = FoodItem(
        name=food_in.name,
        description=food_in.description
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    for img in food_in.images:
        db_img = FoodImage(**img.dict(), food_item_id=db_obj.id)
        db.add(db_img)
    
    for var in food_in.variants:
        db_var = FoodVariant(**var.dict(), food_item_id=db_obj.id)
        db.add(db_var)
    
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.put("/{food_id}", response_model=FoodItemRead)
def update_food_item(
    *,
    db: Session = Depends(get_session),
    food_id: int,
    food_in: FoodItemCreate,
    current_admin: Any = Depends(get_current_admin),
) -> Any:
    food_item = db.get(FoodItem, food_id)
    if not food_item:
        raise HTTPException(status_code=404, detail="Food item not found")
    
    food_item.name = food_in.name
    food_item.description = food_in.description
    db.add(food_item)
    
    # Simple strategy: clear and recreate images/variants for brevity in this MVP
    # In a real app, you'd perform more surgical updates
    db.exec(select(FoodImage).where(FoodImage.food_item_id == food_id)).delete()
    db.exec(select(FoodVariant).where(FoodVariant.food_item_id == food_id)).delete()

    for img in food_in.images:
        db_img = FoodImage(**img.dict(), food_item_id=food_id)
        db.add(db_img)
    
    for var in food_in.variants:
        db_var = FoodVariant(**var.dict(), food_item_id=food_id)
        db.add(db_var)
        
    db.commit()
    db.refresh(food_item)
    return food_item

@router.delete("/{food_id}")
def delete_food_item(
    *,
    db: Session = Depends(get_session),
    food_id: int,
    current_admin: Any = Depends(get_current_admin),
) -> Any:
    food_item = db.get(FoodItem, food_id)
    if not food_item:
        raise HTTPException(status_code=404, detail="Food item not found")
    db.delete(food_item)
    db.commit()
    return {"status": "success"}

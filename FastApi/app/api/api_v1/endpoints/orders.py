from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ....db.database import get_session
from ....models.models import Order, OrderItem, FoodVariant, UserRole, OrderStatus
from ....schemas.schemas import OrderCreate, OrderRead
from ...deps import get_current_user

router = APIRouter()

@router.post("/", response_model=OrderRead)
def create_order(
    *,
    db: Session = Depends(get_session),
    order_in: OrderCreate,
    current_user: Any = Depends(get_current_user),
) -> Any:
    total_price = 0
    order_items = []
    
    for item_in in order_in.items:
        variant = db.get(FoodVariant, item_in.food_variant_id)
        if not variant:
            raise HTTPException(status_code=404, detail=f"Variant {item_in.food_variant_id} not found")
        
        item_price = variant.price * item_in.quantity
        total_price += item_price
        
        order_items.append(OrderItem(
            food_variant_id=variant.id,
            quantity=item_in.quantity,
            price=variant.price
        ))
    
    db_order = Order(
        user_id=current_user.id,
        total_price=total_price,
        status=OrderStatus.PLACED
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    for item in order_items:
        item.order_id = db_order.id
        db.add(item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=List[OrderRead])
def read_orders(
    db: Session = Depends(get_session),
    current_user: Any = Depends(get_current_user),
) -> Any:
    if current_user.role == UserRole.ADMIN:
        orders = db.exec(select(Order)).all()
    else:
        orders = db.exec(select(Order).where(Order.user_id == current_user.id)).all()
    return orders

@router.patch("/{order_id}/status", response_model=OrderRead)
def update_order_status(
    *,
    db: Session = Depends(get_session),
    order_id: int,
    status: OrderStatus,
    current_user: Any = Depends(get_current_user),
) -> Any:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized to update status")
    
    order.status = status
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

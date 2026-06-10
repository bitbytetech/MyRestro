from enum import Enum
from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"

class OrderStatus(str, Enum):
    PLACED = "placed"
    PREPARING = "preparing"
    READY = "ready"
    ON_THE_WAY = "on_the_way"
    DELIVERED = "delivered"

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    full_name: Optional[str] = None
    role: UserRole = Field(default=UserRole.USER)
    
    orders: List["Order"] = Relationship(back_populates="user")
    feedbacks: List["Feedback"] = Relationship(back_populates="user")

class FoodItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    
    images: List["FoodImage"] = Relationship(back_populates="food_item")
    variants: List["FoodVariant"] = Relationship(back_populates="food_item")
    feedbacks: List["Feedback"] = Relationship(back_populates="food_item")

class FoodImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    url: str
    is_primary: bool = Field(default=False)
    food_item_id: int = Field(foreign_key="fooditem.id")
    
    food_item: FoodItem = Relationship(back_populates="images")

class FoodVariant(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str  # e.g., "Half", "Full"
    price: float
    food_item_id: int = Field(foreign_key="fooditem.id")
    
    food_item: FoodItem = Relationship(back_populates="variants")

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    total_price: float
    status: OrderStatus = Field(default=OrderStatus.PLACED)
    payment_status: str = Field(default="pending")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: Optional[User] = Relationship(back_populates="orders")
    items: List["OrderItem"] = Relationship(back_populates="order")

class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(foreign_key="order.id")
    food_variant_id: int = Field(foreign_key="foodvariant.id")
    quantity: int
    price: float  # Snapshotted price at the time of order
    
    order: Order = Relationship(back_populates="items")

class Feedback(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    food_item_id: int = Field(foreign_key="fooditem.id")
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None
    
    user: Optional[User] = Relationship(back_populates="feedbacks")
    food_item: FoodItem = Relationship(back_populates="feedbacks")

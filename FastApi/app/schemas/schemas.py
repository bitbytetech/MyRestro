from pydantic import BaseModel, EmailStr
from typing import Optional, List
from ..models.models import UserRole, OrderStatus

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.USER

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserRead(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Food schemas
class FoodImageBase(BaseModel):
    url: str
    is_primary: bool = False

class FoodVariantBase(BaseModel):
    name: str
    price: float

class FoodItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class FoodItemCreate(FoodItemBase):
    images: List[FoodImageBase] = []
    variants: List[FoodVariantBase] = []

class FoodItemRead(FoodItemBase):
    id: int
    images: List[FoodImageBase] = []
    variants: List[FoodVariantBase] = []

    class Config:
        from_attributes = True

# Order schemas
class OrderItemCreate(BaseModel):
    food_variant_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]

class OrderRead(BaseModel):
    id: int
    user_id: Optional[int]
    total_price: float
    status: OrderStatus
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Feedback schemas
class FeedbackCreate(BaseModel):
    food_item_id: int
    rating: int
    comment: Optional[str] = None

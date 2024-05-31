from pydantic import BaseModel
from datetime import datetime


class ActivityBase(BaseModel):
    title: str
    category: str
    description: str
    start_time: datetime
    always_open: bool 
    end_time: datetime
    image: str

class ActivityCreate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: str

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    username: str
    email: str

class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: str
    hashed_password: str
    activities: list[Activity] = []
    class Config:
        orm_mode = True


class UserActivity(BaseModel):
    user_id: str
    act_id: str


class Token(BaseModel):
    access_token: str
    token_type: str
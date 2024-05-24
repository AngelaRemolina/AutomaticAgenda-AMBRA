from pydantic import BaseModel
import datetime


class ActivityBase(BaseModel):
    title: str
    category: str
    description: str
    start_time: str
    always_open: bool 
    end_time: str


class ActivityCreate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: int
    

    class Config:
        orm_mode = True


class AgendaBase(BaseModel):
    start_time: str
    end_time: str
    owner_id: int


class AgendaCreate(AgendaBase):
    pass


class Agenda(AgendaBase):
    id: int
    activities: list[Activity] = []

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    agendas: list[Agenda] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class AgendaOut(Agenda):
    activity: list[Activity]


class ActivityOut(Activity):
    agendas: list[Agenda]
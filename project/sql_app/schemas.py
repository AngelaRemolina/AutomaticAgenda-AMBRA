from pydantic import BaseModel


class ActivityBase(BaseModel):
    title: str
    category: str
    description: str
    start_time: str
    duration: int
    always_open: bool | None = None


class ActivityCreate(ActivityBase):
    pass


class Activity(ActivityBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class AgendaBase(BaseModel):
    start_time: str
    end_time: str


class AgendaCreate(AgendaBase):
    pass


class Agenda(AgendaBase):
    id: int
    owner_id: int
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
    is_active: bool
    agendas: list[Agenda] = []

    class Config:
        orm_mode = True


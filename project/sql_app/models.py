from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True)
    name = Column(String, index=True)
    username = Column(String, unique =True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    agendas = relationship("Agenda", back_populates="owner")


class Activity(Base):
    __tablename__ = "activity"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(String, index=True)
    start_time = Column(String, index=True)
    duration = Column(Integer, index=True)
    always_open = Column(Boolean, default=False)

    owner = relationship("User", back_populates="items")
    agendas = relationship("Agenda", back_populates="activities")

class Agenda(Base):
    __tablename__ = "Agenda"

    id = Column(String, primary_key=True)
    start_time = Column(String, index=True)
    end_time = Column(String, index=True)
    owner_id = Column(String, ForeignKey("user.id"))

    owner = relationship("User", back_populates="agendas")
    activities = relationship("Activity", back_populates="agendas")
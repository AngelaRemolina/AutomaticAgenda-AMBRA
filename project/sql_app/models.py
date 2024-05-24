from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, Time, DateTime
from sqlalchemy.orm import relationship

from .database import Base

agenda_activity = Table("agenda_activity", Base.metadata,
                       Column("agenda_id", ForeignKey("agendas.id"), primary_key=True),
                       Column("activity_id", ForeignKey("activities.id"), primary_key=True))

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True)
    name = Column(String, index=True)
    username = Column(String, unique =True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    agendas = relationship("Agenda", back_populates="owner",)


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer,primary_key=True)
    title = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(String, index=True)
    start_time = Column(String, index=True)
    end_time = Column(String, index=True)
    always_open = Column(Boolean, default=False)

    agendas = relationship("Agenda", 
                           secondary=agenda_activity,
                           back_populates="activities")

class Agenda(Base):
    __tablename__ = "agendas"

    id = Column(Integer,primary_key=True)
    start_time = Column(String, index=True)
    end_time = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="agendas")
    activities = relationship("Activity", 
                            secondary=agenda_activity,
                            back_populates="agendas")
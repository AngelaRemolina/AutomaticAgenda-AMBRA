from sqlalchemy import Boolean, Column, ForeignKey, String, Table, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import uuid

user_activity = Table(
    "user_activity",
    Base.metadata,
    Column("relation_id", String, primary_key=True, default=str(uuid.uuid4())),
    Column("user_id", ForeignKey("users.id")),
    Column("activity_id", ForeignKey("activities.id")),
)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    name = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    activities = relationship(
        "Activity", secondary=user_activity, back_populates="doers"
    )


class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    title = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(String, index=True)
    start_time = Column(DateTime, index=True)
    end_time = Column(DateTime, index=True)
    always_open = Column(Boolean, default=False)
    image = Column(String, index=True)

    doers = relationship("User", secondary=user_activity, back_populates="activities")

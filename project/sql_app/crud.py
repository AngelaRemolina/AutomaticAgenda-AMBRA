from sqlalchemy.orm import Session

from . import models, schemas
from datetime import datetime

import bcrypt


### Password Hashing ###

def get_hashed_password(plain_text_password):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt(5))

def check_password(plain_text_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(plain_text_password, hashed_password)


### User Methods ###

def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def register_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_hashed_password(user.password)
    db_user = models.User(name = user.name, username= user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

### Activity Methods ###

def get_available_activities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Activity).offset(skip).limit(limit).all()

def create_activity(db: Session, activity: schemas.ActivityCreate):
    db_activity = models.Activity(title=activity.title, category=activity.category, description=activity.description, start_time=activity.start_time, end_time=activity.end_time, always_open=activity.always_open, image=activity.image)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

# Future work
# def get_activities_by_timeslot(db: Session, start_time: str, end_time: str):
#     start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
#     end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
#     return db.query(models.Activity).filter(models.Activity.start_time >= start_time, models.Activity.end_time <= end_time).all()

# get activity by id
def get_activity(db: Session, activity_id: str):
    return db.query(models.Activity).filter(models.Activity.id == activity_id).first()

# Add relationship between activity and user to the user_activity table
def add_activity_to_user(db: Session, user_id: str, activity_id: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_activity = db.query(models.Activity).filter(models.Activity.id == activity_id).first()
    db_user.activities.append(db_activity)
    db_activity.doers.append(db_user)
    db.commit()
    db.refresh(db_user)
    return db_activity
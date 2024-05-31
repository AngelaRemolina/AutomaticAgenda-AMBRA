from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "DB - FastAPI service running"}


### User Methods ###

#Create a user
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.register_user(db=db, user=user)

#Get all users
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)): # todo: ask why 100 limit
    users = crud.get_users(db, skip=skip, limit=limit)
    #todo: make this returns the password too
    return users

#Get a user by id
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

### Activity Methods ###

#Set an activity to a user
@app.post("/users/{user_id}/activities/{activity_id}", response_model=schemas.Activity)
def set_activity_to_user(user_id: str, activity_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    activity = crud.add_activity_to_user(db, user_id=user_id, activity_id=activity_id)
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity

#Create an activity
@app.post("/activities/", response_model=schemas.Activity)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    return crud.create_activity(db=db, activity=activity)

#Get an activity by id
@app.get("/activities/{activity_id}", response_model=schemas.Activity)
def read_activity(activity_id: str, db: Session = Depends(get_db)):
    db_activity = crud.get_activity(db, activity_id=activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity

#Get all activities
@app.get("/activities/", response_model=List[schemas.Activity])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    activities = crud.get_available_activities(db, skip=skip, limit=limit)
    return activities

#Get activities for a specific timeslot sent through query parameters
@app.get("/activities/get/timeslot", response_model=List[schemas.Activity])
def read_activities_by_timeslot(start_time: str, end_time: str, db: Session = Depends(get_db)):
    activities = crud.get_activities_by_timeslot(db, start_time=start_time, end_time=end_time)
    return activities

from fastapi import Depends, FastAPI, HTTPException, Response, status
from schemas import Emails
from database import engine, Base, get_db
import models
from sqlalchemy.orm import Session

app = FastAPI()

# @app.get("/emails")
# def posts():
    # return {"message": "this is working"}

# Combines all data in the models and base and will bind tables with engine that is being imported from the .database.py
models.Base.metadata.create_all(bind=engine)

# Create
@app.post("/emails") # Create a new entry in the database
def create(email: Emails, db: Session = Depends(get_db)): # "db: Session = Depends(get_db)" connects function with database
    new_email = models.Emails(**email.dict()) # "email.dict()" defines how we want our data to be received in request
    db.add(new_email)
    db.commit() # Everytime we make a change to the database we need to commit it
    db.refresh(new_email)
    return new_email

# Read
@app.get("/emails")
def get(db: Session = Depends(get_db)):
    emails = db.query(models.Emails).all() # ".all() tells SQLAlchemy that we want to get all entries present in it and return products"
    return emails

# Update
@app.put("/update/{id}")
def update(id: int, email: Emails, db: Session = Depends(get_db)):
    updated_post = db.query(models.Emails).filter(models.Emails.id == id)
    existing_post = updated_post.first()
    if existing_post == None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"Email with id {id} not found")
    else:
        updated_post.update(email.dict(), synchronize_session=False) # "email.dict()" converts incoming user data to python dictionary
        db.commit()
    return updated_post.first()

# Delete
@app.delete("/delete/{id}")
def delete(id: int, db: Session = Depends(get_db), status_code = status.HTTP_204_NO_CONTENT):
    delete_post = db.query(models.Emails).filter(models.Emails.id == id)
    if delete_post == None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"Email with id {id} not found")
    else:
        delete_post.delete(synchronize_session = False) # "synchronize_session = False" tells SQLAlchemy that we don't want to update the session
        db.commit()
    return Response(status_code = status.HTTP_204_NO_CONTENT)
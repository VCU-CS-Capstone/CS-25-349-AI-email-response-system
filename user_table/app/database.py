from dotenv import load_dotenv
import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Take all information in form of string and create the engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session objects that are necessary to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 

# Base class used to define mapped classes
Base = declarative_base()

# Create a new database session and sends it to the client and the session closes itself when the work is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
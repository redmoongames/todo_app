from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_database():
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()

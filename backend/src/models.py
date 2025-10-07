from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import Optional

Base = declarative_base()

class TaskModel(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    column_id = Column(String(50), nullable=False)
    assignee = Column(String(255), nullable=True)

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    column_id: str
    assignee: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    column_id: Optional[str] = None
    assignee: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    column_id: str
    assignee: Optional[str] = None
    
    class Config:
        from_attributes = True

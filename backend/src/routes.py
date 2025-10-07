from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .database import get_database
from .models import TaskResponse, TaskCreate, TaskUpdate
from .crud import get_tasks, get_task, create_task, update_task, delete_task

router = APIRouter()

@router.get("/tasks", response_model=List[TaskResponse])
def read_tasks(skip: int = 0, limit: int = 100, database: Session = Depends(get_database)):
    tasks = get_tasks(database, skip=skip, limit=limit)
    return tasks

@router.get("/tasks/{task_id}", response_model=TaskResponse)
def read_task(task_id: int, database: Session = Depends(get_database)):
    task = get_task(database, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/tasks", response_model=TaskResponse)
def create_new_task(task: TaskCreate, database: Session = Depends(get_database)):
    return create_task(database=database, task=task)

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_existing_task(task_id: int, task: TaskUpdate, database: Session = Depends(get_database)):
    updated_task = update_task(database=database, task_id=task_id, task=task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@router.delete("/tasks/{task_id}")
def delete_existing_task(task_id: int, database: Session = Depends(get_database)):
    success = delete_task(database=database, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

from sqlalchemy.orm import Session
from .models import TaskModel, TaskCreate, TaskUpdate
from typing import List, Optional

def get_tasks(database: Session, skip: int = 0, limit: int = 100) -> List[TaskModel]:
    return database.query(TaskModel).offset(skip).limit(limit).all()

def get_task(database: Session, task_id: int) -> Optional[TaskModel]:
    return database.query(TaskModel).filter(TaskModel.id == task_id).first()

def create_task(database: Session, task: TaskCreate) -> TaskModel:
    database_task = TaskModel(
        title=task.title,
        description=task.description,
        column_id=task.column_id,
        assignee=task.assignee
    )
    database.add(database_task)
    database.commit()
    database.refresh(database_task)
    return database_task

def update_task(database: Session, task_id: int, task: TaskUpdate) -> Optional[TaskModel]:
    database_task = database.query(TaskModel).filter(TaskModel.id == task_id).first()
    if database_task:
        update_data = task.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(database_task, field, value)
        database.commit()
        database.refresh(database_task)
    return database_task

def delete_task(database: Session, task_id: int) -> bool:
    database_task = database.query(TaskModel).filter(TaskModel.id == task_id).first()
    if database_task:
        database.delete(database_task)
        database.commit()
        return True
    return False

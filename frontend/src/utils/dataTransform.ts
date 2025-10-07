import { Task, ApiTask } from '@/types';

export function apiTaskToTask(apiTask: ApiTask): Task {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description,
    columnId: apiTask.column_id,
    assignee: apiTask.assignee,
  };
}

export function taskToApiTask(task: Task): ApiTask {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    column_id: task.columnId,
    assignee: task.assignee,
  };
}

export function createTaskToApiTask(task: Omit<Task, 'id'>): Omit<ApiTask, 'id'> {
  return {
    title: task.title,
    description: task.description,
    column_id: task.columnId,
    assignee: task.assignee,
  };
}

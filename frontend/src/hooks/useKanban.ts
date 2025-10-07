'use client';

import { useState, useEffect } from 'react';
import { Column, Task } from '@/types';
import { apiService } from '@/services/api';
import { apiTaskToTask, createTaskToApiTask } from '@/utils/dataTransform';

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', order: 0 },
  { id: 'in-progress', title: 'In Progress', order: 1 },
  { id: 'done', title: 'Done', order: 2 }
];

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export function useKanban() {
  const [columns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');
  const [nextTaskId, setNextTaskId] = useState(1);

  const loadTasks = async () => {
    try {
      setLoadingState('loading');
      setError('');
      
      const apiTasks = await apiService.getTasks();
      const convertedTasks = apiTasks.map(apiTaskToTask);
      
      setTasks(convertedTasks);
      setLoadingState('success');
      
      const maxId = Math.max(0, ...convertedTasks.map(task => task.id));
      setNextTaskId(maxId + 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить задачи';
      setError(errorMessage);
      setLoadingState('error');
    }
  };

  const retry = () => {
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getValidColumnId = (columnId: string): string => {
    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    const minOrder = sortedColumns[0]?.order ?? 0;
    const maxOrder = sortedColumns[sortedColumns.length - 1]?.order ?? 0;
    
    const targetColumn = columns.find(col => col.id === columnId);
    if (!targetColumn) {
      const targetOrder = parseInt(columnId);
      if (isNaN(targetOrder)) return sortedColumns[0]?.id ?? 'todo';
      
      if (targetOrder <= minOrder) return sortedColumns[0]?.id ?? 'todo';
      if (targetOrder >= maxOrder) return sortedColumns[sortedColumns.length - 1]?.id ?? 'done';
      
      const closestColumn = sortedColumns.find(col => col.order >= targetOrder);
      return closestColumn?.id ?? sortedColumns[sortedColumns.length - 1]?.id ?? 'done';
    }
    
    return columnId;
  };

  const addTask = async (columnId: string) => {
    try {
      const firstColumn = columns.sort((a, b) => a.order - b.order)[0];
      const newTaskData = {
        title: 'Новая задача',
        description: 'Описание новой задачи',
        columnId: firstColumn.id
      };
      
      const apiTask = await apiService.createTask(createTaskToApiTask(newTaskData));
      const newTask = apiTaskToTask(apiTask);
      
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось создать задачу';
      setError(errorMessage);
      setLoadingState('error');
    }
  };

  const updateTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      const apiUpdates = createTaskToApiTask(updates as Omit<Task, 'id'>);
      const updatedApiTask = await apiService.updateTask(taskId, apiUpdates);
      const updatedTask = apiTaskToTask(updatedApiTask);
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось обновить задачу';
      setError(errorMessage);
      setLoadingState('error');
    }
  };

  const moveTask = async (taskId: number, toColumnId: string) => {
    try {
      const validColumnId = getValidColumnId(toColumnId);
      const apiUpdates = { column_id: validColumnId };
      const updatedApiTask = await apiService.updateTask(taskId, apiUpdates);
      const updatedTask = apiTaskToTask(updatedApiTask);
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось переместить задачу';
      setError(errorMessage);
      setLoadingState('error');
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await apiService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось удалить задачу';
      setError(errorMessage);
      setLoadingState('error');
    }
  };

  const getTasksForColumn = (columnId: string): Task[] => {
    return tasks.filter(task => task.columnId === columnId);
  };

  return {
    columns,
    tasks,
    loadingState,
    error,
    addTask,
    updateTask,
    moveTask,
    deleteTask,
    getTasksForColumn,
    retry
  };
}

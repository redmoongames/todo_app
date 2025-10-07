'use client';

import { ColumnProps } from '@/types';
import Task from './Task';

export default function Column({ 
  column, 
  tasks,
  onAddTask, 
  onUpdateTask, 
  onMoveTask, 
  onDeleteTask,
  isDragOver = false,
  onDragOver,
  onDragLeave 
}: ColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver?.();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      onDragLeave?.();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { taskId, fromColumnId } = data;
      
      if (fromColumnId !== column.id) {
        onMoveTask(taskId, column.id);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  return (
    <div 
      className={`bg-gray-100 rounded-lg p-4 transition-all duration-200 ${
        isDragOver ? 'bg-blue-100 border-2 border-blue-300 border-dashed' : ''
      }`}
      data-column-id={column.id}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{column.title}</h3>
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">
            {isDragOver ? 'Отпустите карточку здесь' : 'Нет задач'}
          </div>
        )}
      </div>
      
      {column.order === 0 && (
        <button
          onClick={() => onAddTask(column.id)}
          className="w-full mt-4 p-2 text-gray-500 hover:text-gray-700 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          + Add Task
        </button>
      )}
    </div>
  );
}

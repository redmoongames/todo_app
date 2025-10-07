'use client';

import { useState } from 'react';
import { KanbanBoardProps } from '@/types';
import Column from './Column';

export default function KanbanBoard({ columns, tasks, onAddTask, onUpdateTask, onMoveTask, onDeleteTask, getTasksForColumn }: KanbanBoardProps) {
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOverColumn(null);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { taskId, fromColumnId } = data;
      
      const targetColumn = columns.find(col => 
        e.currentTarget.contains(e.target as Node) && 
        e.currentTarget.querySelector(`[data-column-id="${col.id}"]`)
      );
      
      if (targetColumn && fromColumnId !== targetColumn.id) {
        onMoveTask(taskId, targetColumn.id);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleColumnDragOver = (columnId: string) => {
    setDraggedOverColumn(columnId);
  };

  const handleColumnDragLeave = () => {
    setDraggedOverColumn(null);
  };

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {columns.sort((a, b) => a.order - b.order).map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={getTasksForColumn(column.id)}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          isDragOver={draggedOverColumn === column.id}
          onDragOver={() => handleColumnDragOver(column.id)}
          onDragLeave={handleColumnDragLeave}
        />
      ))}
    </div>
  );
}

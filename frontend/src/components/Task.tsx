'use client';

import { useState } from 'react';
import { TaskProps } from '@/types';

export default function Task({ task, onUpdateTask, onMoveTask, onDeleteTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleSave = () => {
    onUpdateTask(task.id, { title, description, assignee: assignee || undefined });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setAssignee(task.assignee || '');
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteTask(task.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextareaRef = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId: task.id, fromColumnId: task.columnId }));
    e.dataTransfer.effectAllowed = 'move';
    
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };


  if (isEditing) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full font-medium text-gray-800 mb-2 p-1 border border-gray-300 rounded"
          placeholder="Название задачи"
          style={{ 
            height: 'auto',
            minHeight: '1.5rem'
          }}
        />
        <textarea
          ref={handleTextareaRef}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          className="w-full text-sm text-gray-600 p-1 border border-gray-300 rounded resize-none overflow-hidden"
          placeholder="Описание задачи"
          style={{
            height: 'auto',
            minHeight: '2.5rem'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full text-sm text-gray-600 p-1 border border-gray-300 rounded mt-2"
          placeholder="Исполнитель (необязательно)"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
          >
            Сохранить
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
          >
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all duration-200 relative group cursor-move"
      onMouseEnter={() => {
        setShowEditButton(true);
        setShowDeleteButton(true);
      }}
      onMouseLeave={() => {
        setShowEditButton(false);
        setShowDeleteButton(false);
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {showEditButton && (
        <button
          onClick={handleEditClick}
          className="absolute top-2 right-8 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Редактировать"
        >
          ✏️
        </button>
      )}
      {showDeleteButton && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Удалить"
        >
          ✕
        </button>
      )}
      <h3 className="font-medium text-gray-800 mb-2 pr-16">
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {task.description}
      </p>
      {task.assignee && (
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
          <span className="font-medium">Исполнитель:</span> {task.assignee}
        </div>
      )}
    </div>
  );
}

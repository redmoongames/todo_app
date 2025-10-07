'use client';

import KanbanBoard from '@/components/KanbanBoard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useKanban } from '@/hooks/useKanban';

export default function Home() {
  const { 
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
  } = useKanban();

  if (loadingState === 'loading') {
    return <LoadingState />;
  }

  if (loadingState === 'error') {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Канбан Доска
        </h1>
        
        <KanbanBoard
          columns={columns}
          tasks={tasks}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          getTasksForColumn={getTasksForColumn}
        />
      </div>
    </div>
  );
}

export interface Task {
  id: number;
  title: string;
  description: string;
  columnId: string;
  assignee?: string;
}

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  column_id: string;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onUpdateTask: (taskId: number, updates: Partial<Task>) => void;
  onMoveTask: (taskId: number, toColumnId: string) => void;
  onDeleteTask: (taskId: number) => void;
  getTasksForColumn: (columnId: string) => Task[];
}

export interface ColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onUpdateTask: (taskId: number, updates: Partial<Task>) => void;
  onMoveTask: (taskId: number, toColumnId: string) => void;
  onDeleteTask: (taskId: number) => void;
  isDragOver?: boolean;
  onDragOver?: () => void;
  onDragLeave?: () => void;
}

export interface TaskProps {
  task: Task;
  onUpdateTask: (taskId: number, updates: Partial<Task>) => void;
  onMoveTask: (taskId: number, toColumnId: string) => void;
  onDeleteTask: (taskId: number) => void;
}

const API_BASE_URL = 'http://83.166.247.196:8000/api/v1';

export interface TaskData {
  id: number;
  title: string;
  description: string;
  column_id: string;
  assignee?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }

  async getTasks(): Promise<TaskData[]> {
    return this.request<TaskData[]>('/tasks');
  }

  async getTask(id: number): Promise<TaskData> {
    return this.request<TaskData>(`/tasks/${id}`);
  }

  async createTask(task: Omit<TaskData, 'id'>): Promise<TaskData> {
    return this.request<TaskData>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: number, task: Partial<Omit<TaskData, 'id'>>): Promise<TaskData> {
    return this.request<TaskData>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async deleteTask(id: number): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/');
  }
}

export const apiService = new ApiService();

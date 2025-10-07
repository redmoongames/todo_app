# Todo API

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Health check |
| GET | `/api/v1/tasks` | Get all tasks |
| GET | `/api/v1/tasks/{id}` | Get task by ID |
| POST | `/api/v1/tasks` | Create new task |
| PUT | `/api/v1/tasks/{id}` | Update task |
| DELETE | `/api/v1/tasks/{id}` | Delete task |

## Task Schema

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "column_id": "todo|in-progress|done",
  "assignee": "Assignee name"
}
```

## Run

```bash
docker compose up --build
```

API: http://localhost:8000  
Docs: http://localhost:8000/docs

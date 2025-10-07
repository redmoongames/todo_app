from fastapi import WebSocket
from typing import List
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_task_update(self, task_data: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps({
                    "type": "task_update",
                    "data": task_data
                }))
            except:
                self.active_connections.remove(connection)

    async def broadcast_task_create(self, task_data: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps({
                    "type": "task_create", 
                    "data": task_data
                }))
            except:
                self.active_connections.remove(connection)

    async def broadcast_task_delete(self, task_id: int):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps({
                    "type": "task_delete",
                    "data": {"task_id": task_id}
                }))
            except:
                self.active_connections.remove(connection)

manager = ConnectionManager()

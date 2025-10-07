import { useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'task_update' | 'task_create' | 'task_delete';
  data: any;
}

export function useWebSocket(
  url: string,
  onMessage: (message: WebSocketMessage) => void
) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(() => {
        if (ws.current?.readyState === WebSocket.CLOSED) {
          ws.current = new WebSocket(url);
        }
      }, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url, onMessage]);

  return ws.current;
}

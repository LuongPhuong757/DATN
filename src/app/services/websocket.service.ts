import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../environment/environment';

interface ChatMessage {
  room: string;
  message: string;
  userId: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;
  private messageSubject = new Subject<ChatMessage>();
  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    this.socket.on('newMessage', (message: ChatMessage) => {
      this.messageSubject.next(message);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    this.socket.on('error', (error: Error) => {
      console.error('Socket.IO error:', error);
    });
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('leaveRoom', room);
  }

  sendMessage(room: string, message: string, userId: string): void {
    this.socket.emit('sendMessage', { room, message, userId });
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
} 
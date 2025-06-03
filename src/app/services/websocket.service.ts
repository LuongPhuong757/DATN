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
  public messages$ = new Subject<any>();

  constructor() {
    this.socket = io(environment.url);
    
    this.socket.on('newMessage', (message: any) => {
      this.messages$.next(message);
    });
  }

  joinRoom(room: string) {
    this.socket.emit('joinUserRoom', room);
  }

  leaveRoom(room: string) {
    this.socket.emit('leaveRoom', room);
  }

  sendMessage(room: string, message: string, userId: string) {
    this.socket.emit('sendUserMessage', {
      userId: userId,
      content: message
    });
  }

  getMessages(): Observable<any> {
    return this.messages$.asObservable();
  }

  closeConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
} 
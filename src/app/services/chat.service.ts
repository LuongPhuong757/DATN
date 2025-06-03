import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

export interface ChatMessage {
  id: number;
  userId: number;
  senderId: number;
  isAdmin: boolean;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    userName: string;
    avatar: string;
    roles: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getChatHistory(userId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${environment.url}/chat/history/${userId}`);
  }
} 
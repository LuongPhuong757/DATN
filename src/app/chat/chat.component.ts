import { Component, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
  userId: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked, OnDestroy {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;
  isChatOpen = false;
  messages: Message[] = [];
  newMessage: string = '';
  isLoading = false;
  private subscription: Subscription;
  currentRoom = 'general'; // Default room
  userId = 'user-' + Math.random().toString(36).substr(2, 9); // Generate random user ID

  constructor(private wsService: WebSocketService) {
    // Subscribe to WebSocket messages
    this.subscription = this.wsService.messages$.subscribe(message => {
      this.handleIncomingMessage(message);
    });

    // Join default room
    this.wsService.joinRoom(this.currentRoom);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.wsService.leaveRoom(this.currentRoom);
    this.wsService.closeConnection();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessages.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) { }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private handleIncomingMessage(message: any) {
    this.messages.push({
      text: message.message,
      sender: message.userId === this.userId ? 'user' : 'system',
      timestamp: new Date(message.timestamp),
      userId: message.userId
    });
    this.isLoading = false;
  }

  sendMessage() {
    if (this.newMessage.trim() && !this.isLoading) {
      // Send message through WebSocket
      this.wsService.sendMessage(
        this.currentRoom,
        this.newMessage,
        this.userId
      );

      this.newMessage = '';
      this.isLoading = true;
    }
  }
} 
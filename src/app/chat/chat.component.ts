import { Component, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { ChatService, ChatMessage } from '../services/chat.service';
import { Subscription } from 'rxjs';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
  userId: string;
  // content: string;
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
  currentRoom: string;
  userId: string;
  isAdmin: boolean = false;
  targetUserId: string = '';

  constructor(
    private wsService: WebSocketService,
    private chatService: ChatService
  ) {
    // Get user ID from sessionStorage
    this.userId = sessionStorage.getItem('userId') || '';
    this.isAdmin = sessionStorage.getItem('role') === 'ADMIN';
    console.log(this.isAdmin,'============> isAdmin')
    console.log(this.userId,'============> userId')
    this.currentRoom = `${this.userId}`;

    // Subscribe to WebSocket messages
    this.subscription = this.wsService.messages$.subscribe(message => {
      this.handleIncomingMessage(message);
    });

    // Join user's room
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
      this.loadChatHistory();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private loadChatHistory() {
    if (this.userId) {
      this.chatService.getChatHistory(this.userId).subscribe(
        (history: ChatMessage[]) => {
          this.messages = history.map(msg => ({
            text: msg.content,
            sender: msg.isAdmin ? 'system' : 'user',
            timestamp: new Date(msg.createdAt),
            userId: msg.senderId.toString()
          }));
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error => {
          console.error('Error loading chat history:', error);
        }
      );
    }
  }

  private handleIncomingMessage(message: any) {
    console.log(message,'============> message')
    this.messages.push({
      text: message.content,
      sender: message.userId === this.userId ? 'user' : 'system',
      timestamp: new Date(message.timestamp),
      userId: message.userId,
      // content: message.content
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

  joinUserRoom() {
    if (this.targetUserId && this.isAdmin) {
      // Leave current room
      this.wsService.leaveRoom(this.currentRoom);
      
      // Update current room to target user's room
      this.currentRoom = this.targetUserId;
      
      // Join new room
      this.wsService.joinRoom(this.currentRoom);
      
      // Load chat history for the target user
      this.loadChatHistory();
      
      // Open chat window
      this.isChatOpen = true;
    }
  }
} 
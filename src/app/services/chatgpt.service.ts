import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../environment/environment';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private openai: OpenAI;

  constructor() {
    console.log('Initializing OpenAI with API Key:', environment.openaiApiKey.substring(0, 10) + '...');
    this.openai = new OpenAI({
      apiKey: environment.openaiApiKey,
      dangerouslyAllowBrowser: true // Chỉ sử dụng trong môi trường development
    });
  }

  getChatResponse(message: string): Observable<any> {
    console.log('Sending message to OpenAI:', message);
    return from(this.openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    }).catch(error => {
      console.error('OpenAI API Error:', {
        message: error.message,
        type: error.type,
        code: error.code,
        status: error.status,
        fullError: error
      });
      throw error;
    }));
  }
} 
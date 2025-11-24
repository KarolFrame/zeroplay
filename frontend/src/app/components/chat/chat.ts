import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppIcon } from '../app-icon/app-icon';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, AppIcon],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  messages: { from: 'user' | 'bot'; text: string }[] = [];
  input = '';

  constructor(private chat: ChatService) {}

  send() {
    if (!this.input.trim()) return;

    const userMsg = this.input;
    this.messages.push({ from: 'user', text: userMsg });
    this.input = '';

    this.chat.sendMessage(userMsg).subscribe((res) => {
      this.messages.push({ from: 'bot', text: res.response });
    });
  }
}

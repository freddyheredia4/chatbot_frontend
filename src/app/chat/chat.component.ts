import { Component, OnInit } from '@angular/core';
import { IntentService } from '../training/intent.service';
import { Chat } from './chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  constructor(
    private intentService: IntentService
  ) { }

  chats: Chat[] = []

  ngOnInit(): void {
  }

  send(inputMessage: HTMLInputElement):void {
    this.chats.push({message: inputMessage.value, userType: "HUMAN"});
    this.intentService.ask({message:inputMessage.value, userType:"HUMAN" } ).subscribe(
      (response) => {
        console.log(response);
        this.chats.push({message: response.message, userType: "AGENT"})
      }
    )
    inputMessage.value ="";
  }

}

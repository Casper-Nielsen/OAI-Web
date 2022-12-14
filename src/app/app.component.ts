import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSearchService } from 'src/app/services/api-search.service';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  MessageList : Array<Message> = [];
  title = 'ZBC Chatter';
  questionInput : string = "";
  question : string = "";
  requestFeedback : boolean = false;
  voiceRecord : boolean = false;

  constructor
  (private apiSearch : ApiSearchService, 
    public voiceRecognitionService : VoiceRecognitionService ){
    voiceRecognitionService.init().subscribe(data => this.questionInput = data);
    }

  search(){
    this.voiceRecognitionService.stop();
    this.question = this.questionInput;
    this.questionInput = "";
    let message = new Message();
    message.text = this.question;
    this.MessageList.push(message);
    this.requestFeedback = false;

    this.apiSearch.search(this.question).subscribe(data => {
      setTimeout(() => {
        let message = new Message();
        message.text = data;
        message.isAnswer = true;
        this.MessageList.push(message);
        this.requestFeedback = true;
        for (let index = 0; index < this.MessageList.length-2; index++) {
          const element = this.MessageList[index].delete = true;
        }
        setTimeout(() => {
          while(this.MessageList.length > 2){
            this.MessageList.splice(0,1);
          }
        }, 300)
      }, 250)
    });
  }

  clickFeedback(feedback : boolean){
    this.apiSearch.SendFeedback(feedback)

    this.requestFeedback = false;

    for (let index = 0; index < this.MessageList.length; index++) {
      const element = this.MessageList[index].delete = true;
    }
    setTimeout(() => {
      while(this.MessageList.length){
        this.MessageList.splice(0,1);
      }
    }, 300)
  }

  clickVoiceRec(){
    console.log("switching voice record status")
    if (!this.voiceRecord){
      this.voiceRecognitionService.start().subscribe(status => this.voiceRecord = status);
    }
    else{
      this.voiceRecognitionService.stop();
    }
    this.voiceRecord = false == this.voiceRecord;
    console.log(this.voiceRecord);
    
  }
}

class Message{
  text : string = "";
  isAnswer : boolean = false;
  delete : boolean = false;
}

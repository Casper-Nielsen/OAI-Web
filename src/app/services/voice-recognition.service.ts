import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

 recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords : string = "";

  constructor() { }

  init() : Observable<string> {
    this.recognition.interimResults = true;
    this.recognition.lang = 'da-DK';

    return new Observable<string>((observer) => {
      this.recognition.addEventListener('result', (e : any) => {
        const transcript = Array.from(e.results)
          .map((result : any) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.tempWords = transcript;
        console.log(this.tempWords);
        observer.next(this.tempWords);
      })
    });
  }

  start() : Observable<boolean>  {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    
    return new Observable<boolean>((observer) => {
      this.recognition.addEventListener('end', () => {
        if (this.isStoppedSpeechRecog) {
          this.recognition.stop();
          observer.next(false);
        } else {
          this.wordConcat()
          try{
            this.isStoppedSpeechRecog = true;
            this.recognition.stop();
            observer.next(false);
          }
          catch{}
        }
      });
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
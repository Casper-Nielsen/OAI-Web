import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  @Input() text : string = "";
  @Input() isAnswer : boolean = false;
  @Input() isHidden : boolean = false;
}
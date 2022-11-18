import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSearchService } from 'src/app/services/api-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OAI-Web';
  answer : string = "";
  question : string = "";

  constructor(
    private http: HttpClient, 
    private apiSearch : ApiSearchService){  }

  search(){
    this.apiSearch.search(this.question).subscribe(data => {
      console.log(data);
      this.answer = data;
    });
  }
}

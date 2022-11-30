import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfiguration } from "read-appsettings-json";
import { SearchRequest } from "src/app/models/search-request.model";
import { HttpClient } from '@angular/common/http';
import { AppConfig} from 'src/app/config/app-config';
import { SearchResponse } from '../models/search-response.model';
import { FeedbackRequest } from '../models/feedback-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  private baseURL : string = "";
  private latestSearchRequest : SearchResponse | null = null;

  constructor(private http: HttpClient,  private config: AppConfig) { 
    this.baseURL = String(this.config.config?.ApiAddress);
    
  }

  public search(question : string) : Observable<string>{

    return new Observable<string>((observer) => {

      let searchRequest : SearchRequest = new SearchRequest();
      searchRequest.question = question;
      this.http.post<SearchResponse>(this.baseURL + "Answer", searchRequest).subscribe(data => {
        this.latestSearchRequest = data as SearchResponse;        
        observer.next(data.answer)
    })
      return {
        unsubscribe() { }
      }
    });
  }
  
  public SendFeedback(feedback : boolean) {
      let feedbackRequest : FeedbackRequest = new FeedbackRequest();
      feedbackRequest.questionId = this.latestSearchRequest?.questionId ?? "";
      feedbackRequest.feedback = feedback;
      this.http.post(this.baseURL + "Question/feedback", feedbackRequest).subscribe();
  }
}

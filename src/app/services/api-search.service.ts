import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfiguration } from "read-appsettings-json";
import { SearchRequest } from "src/app/models/search-request.model";
import { HttpClient } from '@angular/common/http';
import { AppConfig} from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  private baseURL : string = "";
  private latestSearchRequest : SearchRequest | null = null;

  constructor(private http: HttpClient,  private config: AppConfig) { 
    this.baseURL = String(this.config.config?.ApiAddress);
    
  }

  public search(question : string) : Observable<string>{

    return new Observable<string>((observer) => {

      this.http.get<SearchRequest>(this.baseURL + question).subscribe(data => {
        this.latestSearchRequest = data as SearchRequest;
        console.log(this.latestSearchRequest);
        console.log(this.latestSearchRequest.answer);
        
        observer.next(data.answer)
    })
      return {
        unsubscribe() { }
      }
    });
  }
}

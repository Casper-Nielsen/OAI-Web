import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Config } from './models/config.model';
import { environment } from './../../environments/environment';

@Injectable()
export class AppConfig {

    public config : Config | null = null;
  
    constructor() {
    }

  public load() {
    return new Promise((resolve, reject) => {
      
        this.config = require("config/env."+ environment.env +".json");
        resolve(true);
    });
  }
}
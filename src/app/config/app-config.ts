import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Config } from './models/config.model';
import { Env } from './models/env.model';

@Injectable()
export class AppConfig {

    public config : Config | null = null;
    private env : Env | null = null;
  
    constructor(private http: HttpClient) {
    }

  public load() {
    return new Promise((resolve, reject) => {
        this.env = require("config/env.json") as Env;
        
        if(this.env == null){
            console.error('Environment file is not set or invalid');
            resolve(true);
        }else{
            this.config = require("config/env."+ this.env?.env +".json");
        }
        resolve(true);
    });
  }
}
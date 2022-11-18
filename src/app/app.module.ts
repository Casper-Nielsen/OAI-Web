import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { APP_INITIALIZER } from '@angular/core';
  import {AppConfig} from 'src/app/config/app-config';

import { AppComponent } from './app.component';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppConfig,
    { 
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

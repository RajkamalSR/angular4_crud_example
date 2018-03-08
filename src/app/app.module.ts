import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PostService } from './service/post.service';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './app-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [


    BrowserModule,
    HttpModule
  ],
  providers: [
    PostService, 
    {provide : ErrorHandler, useClass:AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

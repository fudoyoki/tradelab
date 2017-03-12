import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { SpinnerComponent }   from './spinner.component';

enableProdMode();

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
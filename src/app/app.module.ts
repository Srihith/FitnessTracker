import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { Component, ViewChild, OnInit } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { HealthKit } from '@ionic-native/health-kit/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab1PageModule } from './tab1/tab1.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, Tab1PageModule,HttpClientModule,CommonModule],
  providers: [ {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HealthKit],
  bootstrap: [AppComponent],
})
export class AppModule {}

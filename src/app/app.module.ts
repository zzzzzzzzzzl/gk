import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GaoKaoComponent } from './gao-kao/gao-kao.component';
import { MessagesComponent } from './messages/messages.component';
import { SchooComponent } from './schoo/schoo.component';
import { ZhuanyeComponent } from './zhuanye/zhuanye.component';
import { MeniuComponent } from './meniu/meniu.component';
import { AppRoutingModule } from './app-routing.module';
import { Router, NavigationEnd } from '@angular/router';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
   imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
    declarations: [
    AppComponent,
    DashboardComponent,
    GaoKaoComponent,
    MessagesComponent,
    SchooComponent,
    ZhuanyeComponent,
    MeniuComponent,
    GaoKaoComponent,
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { gaokaoComponent } from './gao-kao/gao-kao.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { MeniuComponent } from './meniu/meniu.component';
import { AppRoutingModule } from './app-routing.module';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { ChaxunComponent } from './chaxun/chaxun.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { XxZyComponent } from './xx-zy/xx-zy.component';
import { Gk2022Component } from './gk2022/gk2022.component';
import { ChaxunModule } from './chaxun/chaxun.module';
import { BKZNComponent } from './bkzn/bkzn.component';
import { ZxzxComponent } from './zxzx/zxzx.component';
import { ZSDTComponent } from './zsdt/zsdt.component';
import { GGYLComponent } from './ggyl/ggyl.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { Mokuai1Component } from './mokuai1/mokuai1.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
   imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ChaxunModule,
    HttpClientModule
  ],
    declarations: [
    AppComponent,

    gaokaoComponent,
    DashboardComponent,
    MessagesComponent,
    MeniuComponent,
    ChaxunComponent,
    XxZyComponent,
    Gk2022Component,
    BKZNComponent,
    ZxzxComponent,
    ZSDTComponent,
    GGYLComponent,
    SubmenuComponent,
    Mokuai1Component,
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

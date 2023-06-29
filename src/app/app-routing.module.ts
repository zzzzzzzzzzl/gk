import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeniuComponent } from './meniu/meniu.component';
import { gaokaoComponent } from './gao-kao/gao-kao.component';
import { ChaxunComponent } from './chaxun/chaxun.component';
import { XxZyComponent } from './xx-zy/xx-zy.component';
import { Gk2022Component } from './gk2022/gk2022.component';
import { UiScrollModule } from 'ngx-ui-scroll';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  { path:'meniu',component:MeniuComponent },
  { path:'gao-kao',component:gaokaoComponent },
  { path:'chaxun',component:ChaxunComponent },
  { path: 'xx-zy/:id', component: XxZyComponent },
  { path: 'detail/:id', component: XxZyComponent },
  { path: 'gk2022', component: Gk2022Component },
  { path: 'filteredchaxun', component: Gk2022Component },
  { path: 'meiniu1', component: MeniuComponent },


  // 其他路由规则...

];

@NgModule({
  imports: [ RouterModule.forRoot(routes),UiScrollModule,ScrollingModule,
    FormsModule,FormsModule],

  exports: [ RouterModule ]


})
export class AppRoutingModule { }

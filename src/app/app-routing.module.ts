import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeniuComponent } from './meniu/meniu.component';
import { gaokaoComponent } from './gao-kao/gao-kao.component';
import { ChaxunComponent } from './chaxun/chaxun.component';

const routes: Routes = [
  { path:'meniu',component:MeniuComponent },
  { path:'gao-kao',component:gaokaoComponent },
  { path:'chaxun',component:ChaxunComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]


})
export class AppRoutingModule { }

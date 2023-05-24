import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeniuComponent } from './meniu/meniu.component';

const routes: Routes = [
  { path:'meniu',component:MeniuComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]


})
export class AppRoutingModule { }

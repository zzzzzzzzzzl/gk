import { Routes } from "@angular/router";
import { ChaxunComponent } from "./chaxun.component";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {

    path: '',

    component: ChaxunComponent
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []

})

export class ChaxunModule { }

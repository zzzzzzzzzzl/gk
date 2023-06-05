import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gk2022',
  templateUrl: './gk2022.component.html',
  styleUrls: ['./gk2022.component.css']
})
export class Gk2022Component implements OnInit {
  constructor(private http: HttpClient) {}

  mergedColumns: string[] = [];
  combinedColumns: string[] = [];

  ngOnInit() {
    this.getCombinedColumns();
  }

  getCombinedColumns() {
    this.http.get<string[]>('http://localhost:3000/combinedColumns').subscribe(
      (response) => {
        this.combinedColumns = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }





}

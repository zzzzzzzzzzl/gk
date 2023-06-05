import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gk2022',
  templateUrl: './gk2022.component.html',
  styleUrls: ['./gk2022.component.css']
})
export class Gk2022Component implements OnInit {
  combinedColumns: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCombinedColumns();
  }

  fetchCombinedColumns() {
    this.http.get<any[]>('http://localhost:3000/combinedColumns').subscribe(
      (response) => {
        this.combinedColumns = response;
      },
      (error) => {
        console.error('Error fetching combined columns:', error);
      }
    );
  }





}

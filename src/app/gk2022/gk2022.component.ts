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
  currentPage: number = 1;
  itemsPerPage: number = 150;
  totalPages: number = 1;
  pages: number[] = [];
  displayedColumns: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCombinedColumns();
  }

  fetchCombinedColumns() {
    this.http.get<any[]>('http://localhost:3000/combinedColumns').subscribe(
      (response) => {
        this.combinedColumns = response;
        this.totalPages = Math.ceil(this.combinedColumns.length / this.itemsPerPage);
        this.updatePages();
        this.getDisplayedColumns();
      },
      (error) => {
        console.error('Error fetching combined columns:', error);
      }
    );
  }

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getDisplayedColumns();
  }

  getDisplayedColumns() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedColumns = this.combinedColumns.slice(startIndex, endIndex);
  }
}

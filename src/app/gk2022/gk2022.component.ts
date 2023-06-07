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
  //-------------------------------------------


  data: any[] = [];
  filteredData: any[] = [];

  // Options for filter dropdowns
  Axuankeyaoqiu: string[] = [];
  Acengci: string[] = [];
  Ashengfen: string[] = [];
  Acity: string[] = [];
  Acitypaihang: string[] = [];
  //-------------------------------------------------------

  constructor(private http: HttpClient, private dataService: DataService) { }


  ngOnInit() {
    this.fetchCombinedColumns();
    this.applyFilter();
    this.extractFilterOptions();
    this.applyFilter();
  }
//-----------------------------------------------------------------------------------
  fetchCombinedColumns() {
    this.http.get<any[]>('http://localhost:3000/combinedColumns').subscribe(
      (response) => {
        this.combinedColumns = response;
        this.data = response; // 将查询结果赋值给 data 数组
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

  getUniqueOptions(field: string): string[] {
    const options = this.data.map(item => item[field]);
    return [...new Set(options)];
  }

  //=-----------------------------------------------------------------------------------------

  extractFilterOptions() {
    this.Axuankeyaoqiu = Array.from(new Set(this.data.map(item => item.Axuankeyaoqiu)));
    this.Acengci = Array.from(new Set(this.data.map(item => item.Acengci)));
    this.Ashengfen = Array.from(new Set(this.data.map(item => item.Ashengfen)));
    this.Acity = Array.from(new Set(this.data.map(item => item.Acity)));
    this.Acitypaihang = Array.from(new Set(this.data.map(item => item.Acitypaihang)));
  }


  applyFilter() {
    this.filteredData = this.data.filter(item => {
      let passFilter = true;

      if (this.Axuankeyaoqiu.length > 0) {
        passFilter = passFilter && this.Axuankeyaoqiu.includes(item.Axuankeyaoqiu);
      }

      if (this.Acengci.length > 0) {
        passFilter = passFilter && this.Acengci.includes(item.Acengci);
      }

      if (this.Ashengfen.length > 0) {
        passFilter = passFilter && this.Ashengfen.includes(item.Ashengfen);
      }

      if (this.Acity.length > 0) {
        passFilter = passFilter && this.Acity.includes(item.Acity);
      }

      if (this.Acitypaihang.length > 0) {
        passFilter = passFilter && this.Acitypaihang.includes(item.Acitypaihang);
      }

      return passFilter;
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

  data: any[] = [];
  filteredData: any[] = [];

  // Options for filter dropdowns
  AxuankeyaoqiuOptions: string[] = [];
  AcengciOptions: string[] = [];
  AshengfenOptions: string[] = [];
  AcityOptions: string[] = [];
  AcitypaihangOptions: string[] = [];

  // Selected filter values
  Axuankeyaoqiu: string = '';
  Acengci: string = '';
  Ashengfen: string = '';
  Acity: string = '';
  Acitypaihang: string = '';

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.fetchCombinedColumns();
  }

  fetchCombinedColumns() {
    this.http.get<any[]>('http://localhost:3000/combinedColumns').subscribe(
      (response) => {
        this.combinedColumns = response;
        this.data = response;
        this.totalPages = Math.ceil(this.combinedColumns.length / this.itemsPerPage);
        this.updatePages();
        this.getDisplayedColumns();
        this.extractFilterOptions();
        this.applyFilter(); // 自动应用初始筛选
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

  extractFilterOptions() {
    this.AxuankeyaoqiuOptions = this.getUniqueOptions('Axuankeyaoqiu');
    this.AcengciOptions = this.getUniqueOptions('Acengci');
    this.AshengfenOptions = this.getUniqueOptions('Ashengfen');
    this.AcityOptions = this.getUniqueOptions('Acity');
    this.AcitypaihangOptions = this.getUniqueOptions('Acitypaihang');
  }

  getUniqueOptions(field: string): string[] {
    const options = this.data.map(item => item[field]);
    return [...new Set(options)];
  }

  applyFilter() {
    this.filteredData = this.combinedColumns.filter(item => {
      let passFilter = true;

      if (this.Axuankeyaoqiu !== '') {
        passFilter = passFilter && this.Axuankeyaoqiu === item.Axuankeyaoqiu;
      }

      if (this.Acengci !== '') {
        passFilter = passFilter && this.Acengci === item.Acengci;
      }

      if (this.Ashengfen !== '') {
        passFilter = passFilter && this.Ashengfen === item.Ashengfen;
      }

      if (this.Acity !== '') {
        passFilter = passFilter && this.Acity === item.Acity;
      }

      if (this.Acitypaihang !== '') {
        passFilter = passFilter && this.Acitypaihang === item.Acitypaihang;
      }

      return passFilter;
    });

    this.displayedColumns = this.filteredData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }


}

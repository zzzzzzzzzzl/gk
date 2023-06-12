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
  filteredColumns: any[] = [];

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

  // 新增的属性
  inputScore: number = 0;
  filteredByScoreData: any[] = [];

  // 新增的属性
  selectedAxuankeyaoqiuOptions: { [key: string]: boolean } = {};
  selectedAcengciOptions: { [key: string]: boolean } = {};
  selectedAshengfenOptions: { [key: string]: boolean } = {};
  selectedAcityOptions: { [key: string]: boolean } = {};
  selectedAcitypaihangOptions: { [key: string]: boolean } = {};

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.restoreFilterOptions(); // 恢复筛选选项
    this.fetchCombinedColumns();
    this.goToPage(1); // 添加此行代码
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
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedColumns = this.filteredData.slice(startIndex, endIndex);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getDisplayedColumns(); // 移动到此处
  }

  getDisplayedColumns() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedColumns = this.filteredData.slice(startIndex, endIndex);
  }

  extractFilterOptions() {
    this.AxuankeyaoqiuOptions = this.getUniqueOptions('Axuankeyaoqiu');
    this.AcengciOptions = this.getUniqueOptions('Acengci');
    this.AshengfenOptions = this.getUniqueOptions('Ashengfen');
    this.AcityOptions = this.getUniqueOptions('Acity');
    this.AcitypaihangOptions = this.getUniqueOptions('Acitypaihang');
  }

  getUniqueOptions(columnName: string): string[] {
    const options: string[] = [];
    for (const item of this.data) {
      const value = item[columnName];
      if (value && !options.includes(value)) {
        options.push(value);
      }
    }
    return options;
  }

  applyFilter() {
    this.filteredData = this.data.filter((item) => {
      return (
        this.selectedAxuankeyaoqiuOptions[item.Axuankeyaoqiu] ||
        this.selectedAcengciOptions[item.Acengci] ||
        this.selectedAshengfenOptions[item.Ashengfen] ||
        this.selectedAcityOptions[item.Acity] ||
        this.selectedAcitypaihangOptions[item.Acitypaihang]
      );
    });

    // 添加筛选分数的逻辑
    if (this.inputScore > 0) {
      this.filteredByScoreData = this.filteredData.filter((item) => {
        return item.Ashengfen >= this.inputScore;
      });
      this.filteredData = this.filteredByScoreData;
    }

    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePages();
  }

  restoreFilterOptions() {
    this.selectedAxuankeyaoqiuOptions = {};
    this.selectedAcengciOptions = {};
    this.selectedAshengfenOptions = {};
    this.selectedAcityOptions = {};
    this.selectedAcitypaihangOptions = {};
  }
}

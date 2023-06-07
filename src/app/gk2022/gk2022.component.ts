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

// 在组件的属性中添加新的选中对象
selectedAxuankeyaoqiuOptions: { [key: string]: boolean } = {};
selectedAcengciOptions: { [key: string]: boolean } = {};
selectedAshengfenOptions: { [key: string]: boolean } = {};
selectedAcityOptions: { [key: string]: boolean } = {};
selectedAcitypaihangOptions: { [key: string]: boolean } = {};

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

      // 检查选中的复选框值
      if (Object.values(this.selectedAxuankeyaoqiuOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAxuankeyaoqiuOptions[item.Axuankeyaoqiu];
      }

      if (Object.values(this.selectedAcengciOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAcengciOptions[item.Acengci];
      }

      if (Object.values(this.selectedAshengfenOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAshengfenOptions[item.Ashengfen];
      }

      if (Object.values(this.selectedAcityOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAcityOptions[item.Acity];
      }

      if (Object.values(this.selectedAcitypaihangOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAcitypaihangOptions[item.Acitypaihang];
      }

      return passFilter;
    });

    // 更新显示的数据
    this.displayedColumns = this.filteredData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }


}

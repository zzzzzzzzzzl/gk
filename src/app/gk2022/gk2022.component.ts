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
    // Filter based on selected options
    this.filteredData = this.combinedColumns.filter(item => {
      let passFilter = true;

      // 根据选中的 "选课要求" 进行筛选
      if (Object.values(this.selectedAxuankeyaoqiuOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAxuankeyaoqiuOptions[item.Axuankeyaoqiu];
      }

      // 根据选中的 "层次" 进行筛选
      if (Object.values(this.selectedAcengciOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAcengciOptions[item.Acengci];
      }

      // 根据选中的 "省份" 进行筛选
      if (Object.values(this.selectedAshengfenOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAshengfenOptions[item.Ashengfen];
      }

      // 根据选中的 "城市" 进行筛选
      if (Object.values(this.selectedAcityOptions).some(value => value)) {
        passFilter = passFilter && this.selectedAcityOptions[item.Acity];
      }

      return passFilter;
    });

    // Filter based on score input
    this.filterByScore();

    // Update total pages based on filtered data
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);

    // Reset current page to 1 if it exceeds the total pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }

    // Update displayed data
    this.displayedColumns = this.filteredData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }





  filterByScore() {
    this.filteredByScoreData = this.filteredData.filter(item => {
      let passFilter = true;

      if (this.inputScore >= 600) {
        // 判定为600分以上的分数
        const scorePlus15 = item['22toudangfen'] + 15;
        const scoreMinus15 = item['22toudangfen'] - 15;

        passFilter = passFilter && (this.inputScore >= scorePlus15 || this.inputScore <= scoreMinus15);
      } else if (this.inputScore >= 550 && this.inputScore < 600) {
        // 550-600分区间
        const scorePlus20 = item['22toudangfen'] + 20;
        const scoreMinus20 = item['22toudangfen'] - 20;

        passFilter = passFilter && (this.inputScore >= scorePlus20 || this.inputScore <= scoreMinus20);
      } else if (this.inputScore >= 490 && this.inputScore < 550) {
        // 490-550分区间
        const scorePlus30 = item['22toudangfen'] + 30;
        const scoreMinus30 = item['22toudangfen'] - 30;

        passFilter = passFilter && (this.inputScore >= scorePlus30 || this.inputScore <= scoreMinus30);
      } else {
        // 低于490分
        const scorePlus20 = item['22toudangfen'] + 20;

        passFilter = passFilter && (this.inputScore >= scorePlus20);
      }

      return passFilter;
    });
  }

  // 新增的方法
  saveFilterOptions() {
    const filterOptions = {
      Axuankeyaoqiu: this.Axuankeyaoqiu,
      Acengci: this.Acengci,
      Ashengfen: this.Ashengfen,
      Acity: this.Acity,
      Acitypaihang: this.Acitypaihang
    };
    localStorage.setItem('filterOptions', JSON.stringify(filterOptions));
  }

  restoreFilterOptions() {
    const savedFilterOptions = localStorage.getItem('filterOptions');
    if (savedFilterOptions) {
      const filterOptions = JSON.parse(savedFilterOptions);
      this.Axuankeyaoqiu = filterOptions.Axuankeyaoqiu;
      this.Acengci = filterOptions.Acengci;
      this.Ashengfen = filterOptions.Ashengfen;
      this.Acity = filterOptions.Acity;
      this.Acitypaihang = filterOptions.Acitypaihang;

      // 选中恢复的选项
      this.selectedAxuankeyaoqiuOptions[this.Axuankeyaoqiu] = true;
      this.selectedAcengciOptions[this.Acengci] = true;
      this.selectedAshengfenOptions[this.Ashengfen] = true;
      this.selectedAcityOptions[this.Acity] = true;
      this.selectedAcitypaihangOptions[this.Acitypaihang] = true;

      // 重新应用筛选器
      this.applyFilter();
    }
  }


  clearFilter() {
    // 重置筛选选项
    this.selectedAxuankeyaoqiuOptions = {};
    this.selectedAcengciOptions = {};
    this.selectedAshengfenOptions = {};
    this.selectedAcityOptions = {};
    this.selectedAcitypaihangOptions = {};
    this.inputScore = 0;
    this.updatePages(); // 添加此行
    this.getDisplayedColumns(); // 添加此行
  }

}

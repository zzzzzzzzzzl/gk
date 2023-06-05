import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chaxun',
  templateUrl: './chaxun.component.html',
  styleUrls: ['./chaxun.component.css']
})
export class ChaxunComponent implements OnInit {
  schools: any[] = []; // 所有学校数据
  filteredSchools: any[] = []; // 过滤后的学校数据
  provinces: string[] = []; // 所有地区
  selectedProvinces: { [province: string]: boolean } = {}; // 选定的地区
  selectedEducationType: string = ''; // 选定的教育类型（公办/民办）
  selected985211: string = ''; // 选定的985/211
  currentPage: number = 1; // 当前页码
  pageSize: number = 50; // 每页显示的学校数量
  totalPages: number = 0; // 总页数

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSchools().subscribe((data: any) => {
      this.schools = data;
      // this.filterSchools();
      this.extractProvinces();
    });
    this.getSchools();
  }

  // applyFilter() {
  //   this.currentPage = 1; // 重置当前页码为第一页
  //   this.filterSchools();
  // }

  applyFilter() {
    this.filteredSchools = this.schools.filter(school => {
      // 根据选择的条件进行筛选
      let passFilter = true;

      // 地区筛选
      const selectedProvinces = Object.keys(this.selectedProvinces).filter(province => this.selectedProvinces[province]);
      if (selectedProvinces.length > 0) {
        passFilter = passFilter && selectedProvinces.includes(school.province);
      }

      // 公办/民办筛选
      if (this.selectedEducationType) {
        passFilter = passFilter && school.education_type === this.selectedEducationType;
      }

      // 985/211筛选
      if (this.selected985211) {
        if (this.selected985211 === '985') {
          passFilter = passFilter && school.is_985 === 1;
        } else if (this.selected985211 === '211') {
          passFilter = passFilter && school.is_211 === 1;
        }
      }

      return passFilter;
    });
  }

  getSchools() {
    this.dataService.getSchools().subscribe(
      (data: any) => {
        this.schools = data;
        this.filteredSchools = this.schools;
      },
      (error: any) => {
        console.error('获取学校数据失败：', error);
      }
    );
  }


  extractProvinces() {
    const uniqueProvinces = new Set(this.schools.map(school => school.province));
    this.provinces = Array.from(uniqueProvinces);
  }


}

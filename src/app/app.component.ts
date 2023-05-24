import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedQuery: string = '';
  submitForm() {
    const id = (document.getElementById('id') as HTMLInputElement).value;

  fetch(`http://localhost:3000/api/data?id=${id}`)
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.getElementById('results');
    console.log(data);
    if (resultsContainer) {
      if (Array.isArray(data)) {
        const results = data.map((item: any) => `<p>${item.school_name} ${item.major_code} ${item.major_name} ${item.school_type}</p>`);
        resultsContainer.innerHTML = results.join('');
      } else {
        // 处理单个对象的情况
        const result = `<p>${data.school_name}</p>`;
        resultsContainer.innerHTML = result;
      }
    }
  })
  .catch(error => {
    console.error('查询失败：', error);
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
      resultsContainer.innerHTML = '查询失败';
    }
  });
  }

  selectQuery(query: string) {
    if (query === 'school') {
      this.handleSchoolQuery();
    } else if (query === 'major') {
      this.handleMajorQuery();
    }
  }

  handleSchoolQuery() {
    // 处理查询学校的逻辑
    // 在此处编写你的代码
  }

  handleMajorQuery() {
    // 处理查询专业的逻辑
    // 在此处编写你的代码
  }
}



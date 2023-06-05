import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getSchools(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/schools');
  }

  // 定义其他需要的数据获取方法
}

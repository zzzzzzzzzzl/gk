import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getSchools(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/schools`);
  }


}





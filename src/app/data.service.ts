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

  // filterByOptions(schools: string[], provinces: string[]): Observable<any[][]> {
  //   const url = `${this.baseUrl}/filteredByOptions`;
  //   const params = new HttpParams()
  //     .set('schools', schools.join(','))
  //     .set('provinces', provinces.join(','));

  //   return this.http.get<any[][]>(url, { params });
  // }

  // getTableData(tableName: string, page: number, pageSize: number): Observable<any[][]> {
  //   const url = `${this.baseUrl}/table-data`;
  //   const params = new HttpParams()
  //     .set('tableName', tableName)
  //     .set('page', String(page))
  //     .set('pageSize', String(pageSize));

  //   return this.http.get<any[][]>(url, { params }).pipe(
  //     tap(data => {
  //       if (data.length > 0) {
  //         this.getDistinctValues(data);
  //       }
  //     })
  //   );
  // }




  // distinctSchools: string[] = [];
  // distinctProvinces: string[] = [];

  // // ...

  // getDistinctValues(tableData: any[][]): void {
  //   const schoolsSet = new Set<string>();
  //   const provincesSet = new Set<string>();

  //   tableData.forEach(row => {
  //     schoolsSet.add(row[0]);
  //     provincesSet.add(row[1]);
  //   });

  //   this.distinctSchools = Array.from(schoolsSet);
  //   this.distinctProvinces = Array.from(provincesSet);

  //   console.log('Distinct Schools:', this.distinctSchools);
  //   console.log('Distinct Provinces:', this.distinctProvinces);
  // }

  // filterSchools(params: any): Observable<any[]> {
  //   const url = `${this.baseUrl}/filteredSchools`;
  //   return this.http.get<any[]>(url, { params });
  // }


}





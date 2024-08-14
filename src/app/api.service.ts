import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://103.164.70.170:3002';

  constructor(private http: HttpClient) { }

  login(userId: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { userId, password });
  }
  submitItem(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/item`;
    return this.http.post<any>(url, formData);
  }
}

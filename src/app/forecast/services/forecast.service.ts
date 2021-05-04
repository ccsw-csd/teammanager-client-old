import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getAbsences(groupId: Number, init: string, end: string): Observable<any> {
    return this.http.post<any>(environment.server + '/forecast/', {groupId, init, end});
  }

  exportForecast(groupId: Number, init: string, end: string, type: number): Observable<object> {
    return this.http.post<object>(environment.server + '/forecast/export/', {groupId, init, end, type}, { responseType: 'blob' as 'json' });
  }
}

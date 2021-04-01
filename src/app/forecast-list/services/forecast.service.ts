import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getAbsences(groupId: Number, init: Date, end: Date): Observable<any> {
    return this.http.post<any>(environment.server + '/forecast/', {groupId, init, end});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CenterDto } from '../to/CenterDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getAppVersion(): Observable<any> {
    return this.http.get<CenterDto[]>(environment.server+ '/utils/version');
  }
}

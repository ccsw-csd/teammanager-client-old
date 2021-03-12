import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CenterDto } from '../center/centerDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private http: HttpClient) { }

  getAllCenters(): Observable<CenterDto[]> {
    return this.http.post<CenterDto[]>(environment.server+ '/center/',{});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListadoCentrosFestivos } from '../model/ListadoCentrosFestivos';

@Injectable({
  providedIn: 'root'
})
export class ListadoCentrosFestivosService {
  getCentrosFestivos(): Observable<ListadoCentrosFestivos[]>{
    return this.http.get<ListadoCentrosFestivos[]>(environment.server + '/center/festiveCenter/');
  }
  constructor(
    private http: HttpClient
  ) { }
}

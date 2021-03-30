import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoGruposPage } from '../model/ListadoGruposPage';
import { Pageable } from '../../core/to/Pageable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ListadoGruposService {

  getGrupos(pageable: Pageable): Observable<ListadoGruposPage> {
    return this.http.post<ListadoGruposPage>(environment.server + '/grouplist/', {pageable});
  }

  constructor(
    private http: HttpClient
) { }
}

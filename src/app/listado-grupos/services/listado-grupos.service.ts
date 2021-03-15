import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoGruposPage } from '../model/ListadoGruposPage';
import { Pageable } from '../page/Pageable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListadoGruposService {

  getGrupos(pageable: Pageable): Observable<ListadoGruposPage> {
    return this.http.post<ListadoGruposPage>('http://localhost:8080/groupList/', {pageable});
  }

  constructor(
    private http: HttpClient
) { }
}

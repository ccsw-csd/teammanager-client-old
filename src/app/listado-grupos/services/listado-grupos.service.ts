import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoGruposPage } from '../model/ListadoGruposPage';
import { Pageable } from '../page/Pageable';

@Injectable({
  providedIn: 'root'
})
export class ListadoGruposService {
  getGrupos(pageable: Pageable): Observable<ListadoGruposPage> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}

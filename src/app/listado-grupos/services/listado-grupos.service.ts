import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoGruposPage } from '../model/ListadoGruposPage';
import { Pageable } from '../page/Pageable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Group } from '../model/Group';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root'
})
export class ListadoGruposService {

  getGrupos(pageable: Pageable): Observable<ListadoGruposPage> {
    return this.http.post<ListadoGruposPage>(environment.server + '/grouplist/', {pageable});
  }

  getPersons(prefix: string): Observable<Person[]> {
    return this.http.post<Person[]>(environment.server + '/grouplist/persons/', prefix);
  }

  getSubgroups(prefix: string): Observable<Group[]> {
    return this.http.post<Group[]>(environment.server + '/grouplist/subgroups/', prefix);
  }
  saveGroup(newGroup: Group): Observable<Group>{
    console.log(newGroup);
    return this.http.put<Group>(environment.server + '/grouplist/', newGroup);
  }

  constructor(
    private http: HttpClient
  ) { }
}

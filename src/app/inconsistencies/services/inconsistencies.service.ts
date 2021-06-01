import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CenterService } from 'src/app/core/services/center.service';
import { CenterDto } from 'src/app/core/to/CenterDto';
import { Pageable } from 'src/app/core/to/Pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InconsistenciesService {

  constructor(private http: HttpClient) { }

  
  getInconsistencies(pageable: Pageable, center: CenterDto): Observable<any> {
    return this.http.post<any>(environment.server + '/person/inconsistencies/', {center: center.id, name:"",pageable: pageable});
  }

  getInconsistenciesDuplicated(pageable: Pageable): Observable<any> {
    return this.http.post<any>(environment.server + '/person/inconsistencies/duplicated', {center: "", name:"",pageable: pageable});
  }

  getInconsistenciesCenter(pageable: Pageable): Observable<any> {
    return this.http.post<any>(environment.server + '/person/inconsistencies/center', {center: "", name:"",pageable: pageable});
  }

  getInconsistenciesNotInPerson(): Observable<any> {
    return this.http.post<any>(environment.server + '/person/inconsistencies/notInPerson', {});
  }
}

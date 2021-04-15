import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonAbsenceDto } from 'src/app/core/person/personAbsenceDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalCalendarService {

  constructor(private http: HttpClient) { }

  
  getAbsencesPersonal(year: Number): Observable<PersonAbsenceDto[]> {
    return this.http.get<PersonAbsenceDto[]>(environment.server + '/personAbsence/' + year + '/fromUser-groupByMonth/');
  }
  
  saveAbsencePersonal(year: Number, dates: Date[]): Observable<void>{
    return this.http.post<void>(environment.server + '/personAbsence/save/', {year:year, dates:dates});
  }


}

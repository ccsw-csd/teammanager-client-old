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
    return this.http.post<void>(environment.server + '/personAbsence/save/', {year:year, dates:this.convertArrayDateToString(dates)});
  }


  private convertArrayDateToString(dates:Date[]) : string[] {
    return dates.map(item => this.convertDateToString(item));
  }
  
  private convertDateToString(date : Date) : string {
    
    let locale = 'en-EN';
    return date.toLocaleDateString(locale, {year:'numeric'})+"-"
      +date.toLocaleDateString(locale, {month:'2-digit'})+"-"
      +date.toLocaleDateString(locale, {day:'2-digit'});
  }

}

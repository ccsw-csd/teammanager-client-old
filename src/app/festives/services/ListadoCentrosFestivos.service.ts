import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Festivos } from '../model/Festivos';
import { ListadoCentrosFestivos } from '../model/ListadoCentrosFestivos';

@Injectable({
  providedIn: 'root'
})
export class ListadoCentrosFestivosService {
  // tslint:disable-next-line: typedef
  saveFestives(year: number, centerid: number, dates: Date[]): Observable<void>{
    return this.http.post<void>(environment.server + '/festives/save/', {year, centerid, dates: this.convertArrayDateToString(dates)});
  }
  getCentrosFestivos(): Observable<ListadoCentrosFestivos[]>{
    return this.http.get<ListadoCentrosFestivos[]>(environment.server + '/center/festiveCenter/');
  }

  getFestives(centerid: number, year: number): Observable<Festivos[]> {
    return this.http.get<Festivos[]>(environment.server + '/festives/'+centerid+'/'+year);
  }
  private convertArrayDateToString(dates: Date[]): string[] {
    return dates.map(item => this.convertDateToString(item));
  }

  private convertDateToString(date: Date): string {

    const locale = 'en-EN';
    return date.toLocaleDateString(locale, {year: 'numeric'}) + '-'
      + date.toLocaleDateString(locale, {month: '2-digit'}) + '-'
      + date.toLocaleDateString(locale, {day: '2-digit'});
  }
  constructor(
    private http: HttpClient
  ) { }
}

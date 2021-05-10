import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReleaseNoteDto } from '../to/ReleaseNoteDto';

@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteService {

  constructor(private http: HttpClient) { }


  find(): Observable<ReleaseNoteDto[]> {
    return this.http.get<ReleaseNoteDto[]>(environment.server+ '/releasenote/');
  }

}

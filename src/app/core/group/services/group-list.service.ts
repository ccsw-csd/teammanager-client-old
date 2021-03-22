import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupListDto } from '../groupListDto';

@Injectable({
  providedIn: 'root'
})
export class GroupListService {

  constructor(private http: HttpClient) { }

  getGroupList(): Observable<GroupListDto[]> {
    return this.http.get<GroupListDto[]>(environment.server+ '/group/');
  }
}

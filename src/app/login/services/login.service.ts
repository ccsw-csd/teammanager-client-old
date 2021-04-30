import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDto } from 'src/app/core/to/PersonDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/to/ResponseCredentials';
import { User } from 'src/app/core/to/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authService: AuthService,) {}

  login(username: string, password: string): Observable<ResponseCredentials> {

    this.authService.clearCredentials();

    return this.http.post<ResponseCredentials>(
      environment.securityServer + '/authenticate',
      {username:username, password: password}
    );
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(
      environment.server + '/user/'
    );
  }  

  personExists(username: String|undefined): Observable<PersonDto> {
    return this.http.get<PersonDto>(environment.server + '/person/' + username );   
  }  

  createPerson(person: PersonDto): Observable<boolean>{
    return this.http.put<boolean>(environment.server + '/person/', person);
  }

  putCredentials(res: ResponseCredentials) {
    this.authService.putTokenCredentials(res);
  }
  
}


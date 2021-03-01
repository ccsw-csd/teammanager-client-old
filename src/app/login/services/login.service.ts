import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  putCredentials(res: ResponseCredentials) {
    this.authService.putTokenCredentials(res);
  }
  
}


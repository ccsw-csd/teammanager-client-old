import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseCredentials } from '../to/ResponseCredentials';
import { User } from '../to/User';
import { UserInfoSSO } from '../to/UserInfoSSO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ssoCredentialsKey : string = 'ssoCredentials';
  ssoToken : string = null;


  userInfoSSO: UserInfoSSO | null = null;
  user: User | null = null;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient,
  ) { }


  // *************************** //
  // **     AUTHENTICATION    ** //
  // *************************** //


  public putSSOCredentials(res: ResponseCredentials) : void {
    this.ssoToken = res.token;
    localStorage.setItem(this.ssoCredentialsKey, this.ssoToken);
  }

  public getSSOToken(): string | null {

    if (this.ssoToken == null) {
      this.ssoToken = localStorage.getItem(this.ssoCredentialsKey);
    }


    return this.ssoToken;
  }


  // *************************** //
  // **       LOGOUT          ** //
  // *************************** //

  public logout() {
    this.clearCredentials();
    this.router.navigateByUrl('login');
  }


  public clearCredentials() {
    localStorage.removeItem(this.ssoCredentialsKey);

    this.ssoToken = null;    
    this.user = null;
    this.userInfoSSO = null;
  }  



  // *************************** //
  // **        UTILS          ** //
  // *************************** //


  isTokenValid() : boolean {
    let token = this.getSSOToken();
    if (token == null) return false;
  
    let expired = this.jwtHelper.isTokenExpired(token);
    if (expired) return false;

    let roles = this.getRoles();
    if (roles == null || roles.length == 0) return false;


    return true;
  }
  


  public getUserInfoSSO() : UserInfoSSO {

    if (this.userInfoSSO == null) {
      let data = this.jwtHelper.decodeToken(this.getSSOToken());
      if (data == null) return null;

      this.userInfoSSO = {
        displayName: data.displayName,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        officeName: data.officeName,
        username: data.sub,
        saga: data.saga,
        grade: data.grade,
        roles: data.roles
      };

    }

    return this.userInfoSSO;

  }

  public getRoles(): String[] {
    let userInfo = this.getUserInfoSSO();
    return userInfo.roles[environment.appCode];
  }

  public registerAccess(): Observable<void> {
    return this.http.get<void>(environment.sso + '/register-access/'+environment.appCode);
  }  
  

  putUserInfo(user: User) {
    this.user = user;
  }


  getUsername() : string | null {
    let userInfo = this.getUserInfoSSO();
    return userInfo.username;
  }

  isAdmin() : boolean {
    return this.user.role == 'ADMIN';
  }

  isGestor() : boolean {
    return this.user.role == 'ADMIN' || this.user.role == 'GESTOR';
  }

  hasRole(role : string) : boolean  {
    let roles = this.getRoles();

    if (roles == null || roles.length == 0) return false;
    return roles.indexOf(role) >= 0;
  }

  withPublicGroups() : boolean {
    if (this.user == null || this.user.role == null) return false;
    return this.user.withPublicGroups;
  }

  getUserInfo() : User | null {
    return this.user;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ResponseCredentials } from 'src/app/core/to/ResponseCredentials';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = "";
  password: string = "";
  isloading : boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  login() {

    if (this.user == "") return;
    if (this.password == "") return;

    this.isloading = true;

    this.loginService.login(this.user, this.password).subscribe(
      (res: ResponseCredentials) => {

        this.loginService.putCredentials(res);

        this.loginService.getUserInfo().subscribe();

        this.router.navigate(['main']);
        
        this.isloading = false;
      },
      () => {

        this.snackbarService.error('Credenciales incorrectas.');
        this.isloading = false;
      }
    );

  }  
}

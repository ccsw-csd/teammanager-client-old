import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonDto } from 'src/app/core/person/personDto';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ResponseCredentials } from 'src/app/core/to/ResponseCredentials';
import { ModifyPersonComponent } from '../modify-person/modify-person.component';
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
  person: PersonDto = new PersonDto();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
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

        this.loginService.personExists(this.user).subscribe((res: PersonDto) => {
          this.person = res;
          if(this.person.username == null){
            this.dialog
              .open(ModifyPersonComponent, {
                width: '700px',
                height: '350px',
                data: {
                  user: this.user
                },
              }).afterClosed()
              .subscribe((result) => {
                if(result)
                  this.router.navigate(['main']);
              })
            this.isloading = false;
          }
          else{
            this.router.navigate(['main']);
            this.isloading = false;
          }
          
        },);
      },
      () => {

        this.snackbarService.error('Credenciales incorrectas.');
        this.isloading = false;
      }
    );

  }  
}

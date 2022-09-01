import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyPersonComponent } from 'src/app/login/modify-person/modify-person.component';
import { LoginService } from 'src/app/login/services/login.service';
import { PersonDto } from '../../to/PersonDto';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { User } from '../../to/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navOpen = true;
  isloading : boolean = false;
  person: PersonDto = new PersonDto();
  @Output() navOpenEvent = new EventEmitter();

  constructor(
    public authService: AuthService,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }

  getName() : string {
    return this.authService.getUserInfoSSO().displayName;
  }

  logout() {
    this.authService.logout();
  }

  getEmailRef() {
    let gitWord2 = "ge";
    let gitWord4 = "i";
    let gitWord3 = "min"; 
    let gitWord1 = "cap";

    let gitWord = gitWord1+gitWord2+gitWord3+gitWord4;

    return "mailto:ccsw.support@"+gitWord+".com?subject=["+environment.appCode+"] Consulta / Feedback";
  }


  
  update() {
    let userInfo = this.authService.getUserInfoSSO();

    this.loginService.personExists(userInfo.username).subscribe((res: PersonDto) => {
      this.person = res;
        this.dialog
          .open(ModifyPersonComponent, {
            width: '700px',
            height: '400px',
            data: {
              user: userInfo.username,
              create: false,
              person: this.person
            },
          }).afterClosed()
          .subscribe((result) => {
            this.person = result;
          })
        this.isloading = false;
      
    },);
  } 
}

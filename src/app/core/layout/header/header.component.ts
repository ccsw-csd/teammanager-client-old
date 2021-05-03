import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyPersonComponent } from 'src/app/login/modify-person/modify-person.component';
import { LoginService } from 'src/app/login/services/login.service';
import { PersonDto } from '../../to/PersonDto';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { User } from '../../to/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : User | null = null;
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
    this.user = this.authService.getUserInfo();
  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }

  getName() : string {
    if (this.user == null) return "";

    let name : string = this.user.displayName;

    return name;
  }

  logout() {
    this.authService.logout();
  }

  
  update() {
    this.loginService.personExists(this.user?.username).subscribe((res: PersonDto) => {
      this.person = res;
        this.dialog
          .open(ModifyPersonComponent, {
            width: '700px',
            height: '400px',
            data: {
              user: this.user?.username,
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

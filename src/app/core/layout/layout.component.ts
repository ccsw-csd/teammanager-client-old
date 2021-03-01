import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => { this.authService.putUserInfo(response.user); this.checkUserDetails();});
  }

  private checkUserDetails() : void {
    let user = this.authService.getUserInfo();

    if (user == null || user.username == null) {

      //TODO no existe el usuario lanzar pantalla de edición
    }
  }
  
  
}

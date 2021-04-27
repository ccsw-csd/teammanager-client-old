import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }


  gruposAlert() : void {

    this.dialog.open(AlertDialogComponent, {width: '500px', height: '250px', data: {
      titulo: 'Forbidden', 
      informacion: 'You do not have permissions to manage groups. Please contact the administrator.'}
    });

  }

}

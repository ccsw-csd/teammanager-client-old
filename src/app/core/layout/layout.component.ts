import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReleaseNoteService } from '../services/releasenote.service';
import { ReleaseNoteDto } from '../to/ReleaseNoteDto';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit { 

  @ViewChild('sidenav') 
  private sideNav?: MatSidenav;

  openNav? : boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private releaseNoteService: ReleaseNoteService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(response => { 

      this.authService.putUserInfo(response.user);
      
      if (this.notExistsPerson()) {
        this.authService.logout();
        return;
      }
      
      this.authService.refreshToken(response.credentials);
      this.authService.registerAccess().subscribe();
      this.readReleaseNotes();
    }); 

  }
  
  private readReleaseNotes() : void {
    
    this.releaseNoteService.find().subscribe(res => {
      if (res != null && res.length > 0) {
        this.showReleaseNotes(res);
      }
    })    
  }

  private showReleaseNotes(releaseNotes: ReleaseNoteDto[]) : void {

    this.dialog.open(ReleaseNotesComponent, {
      width: '600px',
      height: '600px',
      data: {
        notes: releaseNotes
      },
    });
  }

  private notExistsPerson() : boolean {
    let user = this.authService.getUserInfo();

    return user == null || user.withPerson == false;
  }

  public toggleMenu() : void {
    this.sideNav?.toggle();
    this.openNav = this.sideNav?.opened;
  }

  
  
}

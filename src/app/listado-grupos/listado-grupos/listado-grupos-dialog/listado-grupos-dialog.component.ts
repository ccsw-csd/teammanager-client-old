import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Group } from '../../model/Group';
import { Person } from '../../model/Person';
import { ListadoGruposService } from '../../services/listado-grupos.service';

@Component({
  selector: 'app-listado-grupos-dialog',
  templateUrl: './listado-grupos-dialog.component.html',
  styleUrls: ['./listado-grupos-dialog.component.scss']
})
export class ListadoGruposDialogComponent implements OnInit {

  searchManagersCtrl = new FormControl();
  searchSubgroupsCtrl = new FormControl();
  searchMembersCtrl = new FormControl();

  persons: Person[] = [];
  groups: Group[] = [];
  subgroups: Group[] = [];
  managers: any;
  members: Person[] = [];
  errorMsg?: string;
  isLoading = false;


  constructor(
    public dialogRef: MatDialogRef<ListadoGruposDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listadoGruposService: ListadoGruposService,
    @Inject (MatAutocompleteModule) public auto: string,
  ) { }

  ngOnInit(): void {
    this.searchManagersCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.managers = [];
          this.isLoading = true;
        }),
        switchMap(value => this.listadoGruposService.getPersons(value)
          .pipe(
            finalize(() => { this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
          this.managers = data;
        }
    );
    this.searchSubgroupsCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = '';
        this.subgroups = [];
        this.isLoading = true;
      }),
      switchMap(value => this.listadoGruposService.getSubgroups(value)
        .pipe(
          finalize(() => { this.isLoading = false;
          }),
        )
      )
    )
    .subscribe(data => {
        this.subgroups = data;
      }
  );
    this.searchMembersCtrl.valueChanges
  .pipe(
    debounceTime(500),
    tap(() => {
      this.errorMsg = '';
      this.managers = [];
      this.isLoading = true;
    }),
    switchMap(value => this.listadoGruposService.getPersons(value)
      .pipe(
        finalize(() => { this.isLoading = false;
        }),
      )
    )
  )
  .subscribe(data => {
      this.members = data;
    }
);
  }

}

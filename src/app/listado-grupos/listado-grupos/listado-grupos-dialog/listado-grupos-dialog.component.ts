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

  groups: Group[] = [];
  persons: Person[] = [];
  subgroups: Group[] = [];
  managers: Person[] = [];
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
          this.persons = [];
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
          this.persons = data;
          console.log(this.managers);
        }
    );
    this.searchSubgroupsCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = '';
        this.groups = [];
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
        this.groups = data;
        console.log(this.groups);
      }
  );
    this.searchMembersCtrl.valueChanges
  .pipe(
    debounceTime(500),
    tap(() => {
      this.errorMsg = '';
      this.persons = [];
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
      this.persons = data;
      console.log(this.persons);
    }
);
  }
  addMember(member: Person){
    this.members.push(member);
  }
  addManager(manager: Person){
    this.managers.push(manager);
  }
  addSubgroup(group: Group){
    this.subgroups.push(group)
  }
  deleteMember(member: Person){
    this.members.push(member);
  }
  deleteManager(manager: Person){
    this.managers.push(manager);
  }
  deleteSubgroup(group: Group){
    this.subgroups.push(group)
  }
}

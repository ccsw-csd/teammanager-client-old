import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iif } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Group } from '../../model/Group';
import { Person } from '../../model/Person';
import { ListadoGruposService } from '../../services/listado-grupos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-listado-grupos-dialog',
  templateUrl: './listado-grupos-dialog.component.html',
  styleUrls: ['./listado-grupos-dialog.component.scss']
})
export class ListadoGruposDialogComponent implements OnInit {

  searchManagersCtrl = new FormControl();
  searchSubgroupsCtrl = new FormControl();
  searchMembersCtrl = new FormControl();
  formTitulo = new FormControl();

  groups: Group[] = [];
  persons: Person[] = [];
  subgroups: Group[] = [];
  managers: Person[] = [];
  members: Person[] = [];
  usuario = '';
  titulo = '';
  errorMsg?: string;
  newGroup: Group = new Group();
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ListadoGruposDialogComponent>,
    public dialogAlert: MatDialogRef<AlertDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listadoGruposService: ListadoGruposService,
    @Inject (MatAutocompleteModule) public auto: string,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.data != null && this.data.data != null) {
      this.newGroup = Object.assign({}, this.data.data);
      if (this.newGroup.managers !== undefined){
        this.managers = this.newGroup.managers; }
      if (this.newGroup.members !== undefined){
        this.members = this.newGroup.members; }
      if (this.newGroup.subgroups !== undefined){
        this.subgroups = this.newGroup.subgroups; }
      if (this.newGroup.name !== undefined){
        this.titulo = this.newGroup.name;
      }
    }
    if (this.managers.length === 0){
      if (this.authService.getUsername() !== null) {
        // tslint:disable-next-line: no-non-null-assertion
        this.usuario = this.authService.getUsername()!;
        this.listadoGruposService.getManagerUsername(this.usuario).subscribe(data => this.addManager(data));
      }
    }
    this.searchManagersCtrl.valueChanges
      .pipe(
        debounceTime(100),
        tap(() => {
          this.errorMsg = '';
          this.persons = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          iif(() => value.length > 2,
          this.listadoGruposService.getPersons(value))
          .pipe(
            finalize(() => { this.isLoading = false; }),
          )
        )
      )
      .subscribe((data: any) => {
          this.persons = data;
      }
    );

    this.searchMembersCtrl.valueChanges
      .pipe(
        debounceTime(200),
        tap(() => {
          this.errorMsg = '';
          this.persons = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          iif(() => value.length > 2,
            this.listadoGruposService.getPersons(value))
          .pipe(
            finalize(() => { this.isLoading = false; }),
          )
        )
      )
      .subscribe(data => {
          this.persons = data;

      }
    );

    this.searchSubgroupsCtrl.valueChanges
      .pipe(
        debounceTime(200),
        tap(() => {
          this.errorMsg = '';
          this.groups = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          iif(() => value.length > 2,
          this.listadoGruposService.getSubgroups(value))
          .pipe(
            finalize(() => { this.isLoading = false; }),
          )
        )
      )
      .subscribe(data => {
          this.groups = data;
      }
    );
  }
  // tslint:disable-next-line: typedef
  addMember(member: Person){
    this.members.push(member);

  }
  // tslint:disable-next-line: typedef
  addManager(manager: Person){
    this.managers.push(manager);

  }
  // tslint:disable-next-line: typedef
  addSubgroup(group: Group){
    this.subgroups.push(group);
  }

  // tslint:disable-next-line: typedef
  deleteMember(member: Person){
    if (this.members.indexOf(member) !== -1){
      this.members.splice(this.members.indexOf(member), 1);
    }
  }
  // tslint:disable-next-line: typedef
  deleteManager(manager: Person){
    if (this.managers.indexOf(manager) !== -1){
      this.managers.splice(this.managers.indexOf(manager), 1);
    }
   }
  // tslint:disable-next-line: typedef
  deleteSubgroup(group: Group){
    if (this.subgroups.indexOf(group) !== -1){
      this.subgroups.splice(this.subgroups.indexOf(group), 1);
    }
  }
  // tslint:disable-next-line: typedef
  onSave(){
    this.isLoading = true;
    this.newGroup.name = this.titulo;
    this.newGroup.managers = this.managers;
    this.newGroup.members = this.members;
    this.newGroup.subgroups = this.subgroups;
    // tslint:disable-next-line: triple-equals
    if (this.newGroup.name != ''){
      if (this.newGroup.managers.length > 0){
        this.listadoGruposService.saveGroup(this.newGroup).subscribe(() => {
          this.isLoading = false;
          this.cerrar(); });
      }
      else {
        const dialogAlert = this.dialog.open(AlertDialogComponent, {width: '500px', height: '250px', data: {
          titulo: 'Error en la validación del formulario', informacion: 'El campo managers es obligatorio y no puede estar vacío. Por favor rellene el campo para poder continuar.'}});
        this.isLoading = false;
      }
    }else{
      const dialogAlert = this.dialog.open(AlertDialogComponent, {width: '500px', height: '250px', data: {
        titulo: 'Error en la validación del formulario', informacion: 'El campo nombre es obligatorio y no puede estar vacío. Por favor rellene el campo para poder continuar.'}});
      this.isLoading = false;
    }
  }
  // tslint:disable-next-line: typedef
  cerrar(){
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoGruposService } from '../../services/listado-grupos.service';
import { Group } from '../../model/Group';
import { AuthService } from 'src/app/core/services/auth.service';
import { Respuesta } from '../../model/Respuesta';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-confirmDelete-dialog',
  templateUrl: './confirmDelete-dialog.component.html',
  styleUrls: ['./confirmDelete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  usuario = '';
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    public dialog: MatDialog,
    private listadoGruposService: ListadoGruposService,
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  confirmarBorrado(group: Group){
    this.isLoading = true;
    // tslint:disable-next-line: no-non-null-assertion
    this.listadoGruposService.validarUsuario(group.id!).subscribe(data => {

      if (data.activo === true){
        const dialogRef = this.dialog.open(AlertDialogComponent, {width: '500px', height: '250px', data});
        this.isLoading = false;
        this.cerrar();
      }
      else {
        this.cerrar();
        this.isLoading = false;
      }
    });
  }

  // tslint:disable-next-line: typedef
  cerrar(){
    this.dialogRef.close();
  }
}

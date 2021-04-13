import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoGruposService } from '../../services/listado-grupos.service';
import { Group } from '../../model/Group';
import { AuthService } from 'src/app/core/services/auth.service';
import { Respuesta } from '../../model/Respuesta';

@Component({
  selector: 'app-del-dialog',
  templateUrl: './del-dialog.component.html',
  styleUrls: ['./del-dialog.component.scss']
})
export class DelDialogComponent implements OnInit {
  usuario = '';

  constructor(
    public dialogRef: MatDialogRef<DelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private listadoGruposService: ListadoGruposService,
  ) { }

  ngOnInit(): void {
  }

  confirmarBorrado(group: Group){
    this.listadoGruposService.validarUsuario(group.id!).subscribe(data => {
      alert(data.response);
      this.cerrar();
    });
  }

  cerrar(){
    this.dialogRef.close();
  }
}

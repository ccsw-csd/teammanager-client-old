import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoGrupos } from '../../model/ListadoGrupos';
import { ListadoGruposService } from '../../services/listado-grupos.service';

@Component({
  selector: 'app-listado-grupos-dialog',
  templateUrl: './listado-grupos-dialog.component.html',
  styleUrls: ['./listado-grupos-dialog.component.scss']
})
export class ListadoGruposDialogComponent implements OnInit {

  group: ListadoGrupos = new ListadoGrupos;

  constructor(
    public dialogRef: MatDialogRef<ListadoGruposDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listadoGruposService: ListadoGruposService
  ) { }

  ngOnInit(): void {
  }

}

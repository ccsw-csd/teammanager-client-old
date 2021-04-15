import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-centros-festivos',
  templateUrl: './listado-centros-festivos.component.html',
  styleUrls: ['./listado-centros-festivos.component.scss']
})
export class ListadoCentrosFestivosComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'icon',
    'nombreCentro',
    'numFestivosAnoActual',
    'numFestivosAnoSiguiente',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

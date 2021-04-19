import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListadoCentrosFestivos } from './model/ListadoCentrosFestivos';
import { ListadoCentrosFestivosService } from './service/ListadoCentrosFestivos.service';

@Component({
  selector: 'app-listado-centros-festivos',
  templateUrl: './listado-centros-festivos.component.html',
  styleUrls: ['./listado-centros-festivos.component.scss']
})
export class ListadoCentrosFestivosComponent implements OnInit {

  dataSource = new MatTableDataSource<ListadoCentrosFestivos>();
  displayedColumns: string[] = [
    'name',
    'festiveActualYear',
    'festiveNextYear',
    'icon',
  ];

  constructor(
    private listadoCentrosFestivosService: ListadoCentrosFestivosService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  // tslint:disable-next-line: typedef
  load(){
    this.listadoCentrosFestivosService.getCentrosFestivos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // tslint:disable-next-line: typedef
  edit(id: ListadoCentrosFestivos){

  }

}

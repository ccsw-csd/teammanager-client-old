import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditCentroComponent } from './edit-centro/edit-centro/edit-centro.component';
import { InfoCentro } from './model/InfoCentro';
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

  infoCentro: InfoCentro = new InfoCentro();

  constructor(
    private listadoCentrosFestivosService: ListadoCentrosFestivosService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  // tslint:disable-next-line: typedef
  loadPage(){
    this.listadoCentrosFestivosService.getCentrosFestivos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // tslint:disable-next-line: typedef
  edit(centerid: number, name: string){

    this.infoCentro.name = name;

    this.infoCentro.centerid = centerid;


    if (centerid != null && name != null){
      // tslint:disable-next-line: deprecation
        const dialogRef = this.dialog.open(EditCentroComponent, {maxWidth: '90vw', width: '90vw', height: 'calc(100vh - 100px)', data: this.infoCentro});
        dialogRef.afterClosed().subscribe(() => {
          this.loadPage();
        });
    }
  }

}

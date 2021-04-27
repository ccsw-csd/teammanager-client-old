import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditCentroComponent } from './edit-centro/edit-centro/edit-centro.component';
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
    this.loadPage();
  }

  // tslint:disable-next-line: typedef
  loadPage(){
    this.listadoCentrosFestivosService.getCentrosFestivos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // tslint:disable-next-line: typedef
  edit(id: number, name: string){
    console.log(name);
    console.log(id);
    if (id != null && name != null){
      // tslint:disable-next-line: deprecation
        const dialogRef = this.dialog.open(EditCentroComponent, {width: '90%', height: 'fit-content', data: {id, name}});
        dialogRef.afterClosed().subscribe(() => {
          this.loadPage();
        });
    }
  }

}

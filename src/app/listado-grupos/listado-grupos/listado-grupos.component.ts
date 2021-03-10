import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from '../page/Pageable';
import { ListadoGruposService } from '../services/listado-grupos.service';
import { ListadoGruposDialogComponent } from './listado-grupos-dialog/listado-grupos-dialog.component';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.scss']
})
export class ListadoGruposComponent implements OnInit {

  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;

  dataSource = new MatTableDataSource<ListadoGruposComponent>();
  displayedColumns: string[] = ['id', 'nombre', 'gestores', 'numPersonas', 'numSubGrupos', 'actions'];

  constructor(
    private listadoGruposService: ListadoGruposService,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  loadPage(event?: PageEvent){
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'name',
        direction: 'ASC'
      }]
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.listadoGruposService.getGrupos(pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  // tslint:disable-next-line: typedef
  createGroup() {
    const dialogRef = this.dialog.open(ListadoGruposDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

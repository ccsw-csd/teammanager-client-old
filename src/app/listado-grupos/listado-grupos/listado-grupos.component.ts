import { group, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListadoGrupos } from '../model/ListadoGrupos';
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

  dataSource = new MatTableDataSource<ListadoGrupos>();
  displayedColumns: string[] = ['id', 'name', 'manager', 'members', 'subgroups', 'actions'];

  constructor(
    private listadoGruposService: ListadoGruposService,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.loadPage();
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
      if (data.content != null) {
        this.dataSource.data = data.content;
      }
      if (data.pageable?.pageNumber != null) {
        this.pageNumber = data.pageable.pageNumber;
      }
      if (data.pageable?.pageSize != null) {
        this.pageSize = data.pageable.pageSize;
      }
      if (data.totalElements != null) {
        this.totalElements = data.totalElements;
      }
    });
  }

  createGroup() {
    const dialogRef = this.dialog.open(ListadoGruposDialogComponent, {
      data: {}

  });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
  });
  }


}

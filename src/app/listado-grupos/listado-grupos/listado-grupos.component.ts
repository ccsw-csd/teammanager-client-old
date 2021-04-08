import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListadoGrupos } from '../model/ListadoGrupos';
import { Pageable } from '../../core/to/Pageable';
import { ListadoGruposService } from '../services/listado-grupos.service';
import { ListadoGruposDialogComponent } from './listado-grupos-dialog/listado-grupos-dialog.component';
import { Group } from '../model/Group';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.scss']
})
export class ListadoGruposComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;
  editingGroup!: Group;

  dataSource = new MatTableDataSource<ListadoGrupos>();
  displayedColumns: string[] = [
    'name',
    'manager',
    'members',
    'subgroups',
    'buttons'
  ];
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
      width: '90%', height: '90%', data: {}

  });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  editGroup(groupEdit: ListadoGrupos){
    if (groupEdit.id !== undefined) {
      this.listadoGruposService.getGroup(groupEdit.id).subscribe(data => {
        const dialogRef = this.dialog.open(ListadoGruposDialogComponent, {data});
        dialogRef.afterClosed().subscribe(() => {
          delay(2000);
          this.loadPage();
        });
      });
    }
  }
}


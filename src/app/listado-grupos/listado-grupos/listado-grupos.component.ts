import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from '../page/Pageable';

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
  constructor() { }
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


  }

}

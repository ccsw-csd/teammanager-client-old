import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { ListadoGrupos } from 'src/app/listado-grupos/model/ListadoGrupos';
import { Pageable } from 'src/app/core/to/Pageable';
import { ListadoGruposService } from 'src/app/listado-grupos/services/listado-grupos.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  adminView : boolean = false;
  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;
  
  dataSource = new MatTableDataSource<ListadoGrupos>();  
  displayedColumns: string[] = [
    'name',
    'manager',
    'members',
    'subgroups',
    'buttons'
  ];

  
  constructor(public authService: AuthService,
    private listadoGruposService: ListadoGruposService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loadPage();
  }

  ngAfterViewInit() {
  }
  
  detailForecast(row: any): void{
    this.router.navigate(['forecast-detail'], { queryParams: {id: row.id, name: row.name } });
  }

  changeAdminView(event: MatSlideToggleChange) {
    this.adminView = event.checked;
    this.loadPage();
  }

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

    this.listadoGruposService.getGrupos(this.adminView, pageable).subscribe(data => {
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

}

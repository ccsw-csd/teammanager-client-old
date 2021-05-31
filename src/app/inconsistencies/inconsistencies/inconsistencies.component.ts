import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from 'src/app/core/services/center.service';
import { CenterDto } from 'src/app/core/to/CenterDto';
import { Pageable } from 'src/app/core/to/Pageable';
import { ListadoGrupos } from 'src/app/listado-grupos/model/ListadoGrupos';
import { InconsistenciesService } from '../services/inconsistencies.service';

@Component({
  selector: 'app-inconsistencies',
  templateUrl: './inconsistencies.component.html',
  styleUrls: ['./inconsistencies.component.scss']
})
export class InconsistenciesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  dataSource = new MatTableDataSource<any>();
  pageNumber = 0;
  pageSize = 100;
  title="Inconsistencies";
  base=false;
  typechanged="";
  selectedCenter: CenterDto = new CenterDto;
  totalElements = 0;
  isloading = false;
  displayedColumns: string[] = [
    'name',
    'lastname',
    'username',
    'email',
    'center'
  ];
  centers: CenterDto[] = [];

  type ="";
  constructor(private route: ActivatedRoute,  private inconsistenciesService: InconsistenciesService, private centerService: CenterService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.type = params['prop'];
      this.centerService.getAllCenters().subscribe(data => {
        this.centers = data;
      });
      this.loadPage();
    });
  }

  loadPage(event?: PageEvent){
    this.isloading=true;
    this.base=false;
    this.displayedColumns = [
      'name',
      'lastname',
      'username',
      'email',
      'center'
    ];
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'name',
        direction: 'ASC'
      }]
    };

    if(this.typechanged != this.type){
      const pageable: Pageable = {
        pageNumber: 0,
        pageSize: 100,
        sort: [{
          property: 'name',
          direction: 'ASC'
        }]
      };
    }


    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }
    switch(this.type) {
      case "basic":
        this.title="Inconsistencies: General";
        this.inconsistenciesService.getInconsistencies(pageable, this.selectedCenter).subscribe(data => {
          this.base=true;
          this.displayedColumns = [
            'name',
            'lastname',
            'username',
            'email',
            'center',
            'numberAbsences'
          ];
          if (data.content != null) {
            this.dataSource = data.content;
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
          this.isloading=false;
          console.log(data);
          this.typechanged = this.type;
        });
        break;
      case "notDb":
        this.title="Inconsistencies: Users in TPerson but not in Person";
        this.inconsistenciesService.getInconsistenciesNotInPerson().subscribe(data => {

          if (data.content != null) {
            this.dataSource = data.content;
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
          this.isloading=false;
          this.typechanged = this.type;
          console.log(data);
        });
        break;
      case "center":
        this.title="Inconsistencies: Person without Center assigned";
        this.inconsistenciesService.getInconsistenciesCenter(pageable).subscribe(data => {
          if (data.content != null) {
            this.dataSource = data.content;
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
          console.log(data);
          this.isloading=false;
        });
        break;
      case "saga":
        this.title="Inconsistencies: Person with username or SAGA duplicated";
        this.inconsistenciesService.getInconsistenciesDuplicated(pageable).subscribe(data => {
          if (data.content != null) {
            this.dataSource = data.content;
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
          this.isloading=false;
          this.typechanged = this.type;
          console.log(data);
        });
        break;
      default:
        // code block
    }
  }



}

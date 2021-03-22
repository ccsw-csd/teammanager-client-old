import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GroupListDto } from 'src/app/core/group/groupListDto';
import { GroupListService } from 'src/app/core/group/services/group-list.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private groupListService: GroupListService,) { }
    public form: FormGroup | undefined;

  groupList: GroupListDto[] = [];

  displayedColumns: string[] = [
    'name',
    'manager',
    'members',
    'subgroups',
    'buttons'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  dataSource: any;


  ngOnInit(): void {
    this.getGroupList();
  }

  ngAfterViewInit() {
  }

  appendListDataSource(res: any) {
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getGroupList(){
  
   this.groupListService.getGroupList().subscribe((res: GroupListDto[]) => {this.groupList = res;
    this.appendListDataSource(this.groupList);
   });

    
  }

}

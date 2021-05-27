import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListadoGrupos } from 'src/app/listado-grupos/model/ListadoGrupos';

@Component({
  selector: 'app-inconsistencies',
  templateUrl: './inconsistencies.component.html',
  styleUrls: ['./inconsistencies.component.scss']
})
export class InconsistenciesComponent implements OnInit {
  dataSource = new MatTableDataSource<ListadoGrupos>();
  displayedColumns: string[] = [
    'name',
    'manager',
    'members',
    'subgroups',
    'buttons'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { MonthCalendarComponent } from 'src/app/month-calendar/month-calendar/month-calendar.component';

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit {
  year : any=2021;
  months:any[]= [
    [
      {"name": "Enero", "number": "1"},
      {"name" : "Febrero", "number": "2"},
      {"name" : "Marzo", "number": "3"},
      {"name" : "Abril", "number": "4"},
    ],
    [
      {"name" : "Mayo", "number": "5"},
      {"name" : "Junio", "number": "6"},
      {"name" : "Julio", "number": "7"},
      {"name" : "Agosto", "number": "8"},
    ],
    [
      {"name" : "Septiembre", "number": "9"},
      {"name" : "Octubre", "number": "10"},
      {"name" : "Noviembre", "number": "11"},
      {"name" : "Diciembre", "number": "12"},
    ]
  ];
  constructor() {}

  ngOnInit(): void {}
  

}

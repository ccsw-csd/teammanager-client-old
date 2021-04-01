import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit, OnChanges {
  @Input() month !: any;
  @Input() year !: any;
  
  week: string[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthName: string[] = [
    "Enero",
    "Febrero",
    "Marzo", 
    "Abril",
    "Mayo", 
    "Junio", 
    "Julio", 
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];


  monthSelect: any[] | undefined;
  dateSelect: any;
  dateValue: any;


  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
      this.getDaysFromDate(this.month, this.year)
  }
  
  getDaysFromDate(month: number, year: number) {
    //Fecha inicio y fecha fin
    const startDate = moment(`${year}-${month}-01`, "YYYY-M-DD");
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    //Dias de diferencia entre la fecha inicio y fecha fin
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);
    
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1; //El mes empieza en 1
      const dayObject = moment(`${year}-${month}-${a}`, "YYYY-M-D");
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getDaysFromDate(this.month, this.year)
  }
  
}
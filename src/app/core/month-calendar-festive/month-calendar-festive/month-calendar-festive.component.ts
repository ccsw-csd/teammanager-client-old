import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Festivos } from 'src/app/listado-centros-festivos/model/Festivos';

@Component({
  selector: 'app-month-calendar-festive',
  templateUrl: './month-calendar-festive.component.html',
  styleUrls: ['./month-calendar-festive.component.scss']
})
export class MonthCalendarFestiveComponent implements OnInit, OnChanges {
  @Input() month !: any;
  @Input() year !: any;
  @Input() festives!: any;
  @Output() newFestive = new EventEmitter<any>();

  week: string[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
  ];

  monthName: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  monthSelect: any[] | undefined;
  dateSelect: any;
  dateValue: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getDaysFromDate(this.month, this.year);
  }

  // tslint:disable-next-line: typedef
  addNewFestive(data: any) {
    this.newFestive.emit(data);
    if (data.class === 'F-festive'){
      data.class = 'normal';
      data.type = 'laboral';
    }
    else if (data.class === 'normal'){
      data.class = 'F-festive';
      data.type = 'F';
    }

  }

  getDaysFromDate(month: number, year: number) {
    // Fecha inicio y fecha fin
    const startDate = moment(`${year}-${month}-01`, 'YYYY-M-DD');
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    // Dias de diferencia entre la fecha inicio y fecha fin
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const dayFestiveObject: any[] = [];

    if (this.festives != null){
      // tslint:disable-next-line: forin
      for (const i in this.festives){
        dayFestiveObject.push(moment(this.festives[i].date, 'YYYY-MM-D'));
      }
    }

    const arrayDays = Object.keys([...Array(numberDays)]).map((f: any) => {
      f = parseInt(f) + 1; // El mes empieza en 1
      const dayObject = moment(`${year}-${month}-${f}`, 'YYYY-MM-D');
      for (const i in dayFestiveObject){
        if (dayFestiveObject[i].date() == dayObject.date() && this.month == this.festives[i].month)
        {
          return {
            name: dayObject.format('dddd'),
            value: f,
            indexWeek: dayObject.isoWeekday(),
            class: 'F-festive',
            type: 'F',
            date: dayFestiveObject[i],
            festive: this.festives[i]
          };
        }
      }
      return {
        name: dayObject.format('dddd'),
        value: f,
        indexWeek: dayObject.isoWeekday(),
        class: 'normal',
        type: 'laboral',
        date: dayObject,
        festive: null
      };

    });

    this.monthSelect = arrayDays;
  }

  // tslint:disable-next-line: typedef
  ngOnChanges(changes: SimpleChanges) {
    this.getDaysFromDate(this.month, this.year);
  }

}

import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
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
  @Input() absences !: any;
  @Output() newAbsence = new EventEmitter<any>();
  
  week: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  monthName: string[] = [
    "January",
    "February",
    "March", 
    "April",
    "May", 
    "June", 
    "July", 
    "August",
    "September",
    "October",
    "November",
    "December"
  ];


  monthSelect: any[] | undefined;
  dateSelect: any;
  dateValue: any;
  diasLaborales: number = 20;

  constructor(
    private router: Router
  ) {

  }


  ngOnInit(): void {
      this.getDaysFromDate(this.month, this.year);
  }

  addNewAbsence(data: any) {
    this.newAbsence.emit(data);
    if(data.class == "A-absence"){
      data.class = "normal";
      data.type = "laboral";
    }

    else if(data.class == "normal"){
      data.class = "A-absence";
      data.type = "A";
    }

  }

  getDaysFromDate(month: number, year: number) {
    //Fecha inicio y fecha fin
    const startDate = moment(`${year}-${month}-01`, "YYYY-M-DD");
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    //Dias de diferencia entre la fecha inicio y fecha fin
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);
    const dayAbsenceObject: any[] = [];
    
    this.diasLaborales = 0;

    if(this.absences != null){
      for(var i in this.absences){
        dayAbsenceObject.push(moment(this.absences[i].date, "YYYY-MM-D"));
      }
    }
    
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1; //El mes empieza en 1
      const dayObject = moment(`${year}-${month}-${a}`, "YYYY-M-D");
      for(var i in dayAbsenceObject){
        if(dayAbsenceObject[i].date() == dayObject.date())
        {
          return {
            name: dayObject.format("dddd"),
            value: a,
            indexWeek: dayObject.isoWeekday(),
            class: this.absences[i].type + "-absence",
            type: this.absences[i].type,
            date: dayAbsenceObject[i],
            absence: this.absences[i]
          };
        }
      }

      if (dayObject.isoWeekday() < 6) this.diasLaborales++; 
      
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        class: "normal",
        type: "laboral",
        date: dayObject,
        absence: null
      };

    });

    this.monthSelect = arrayDays;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getDaysFromDate(this.month, this.year);
  }
  
}

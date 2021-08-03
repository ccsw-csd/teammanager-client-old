import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, DebugElement  } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { User } from '../../to/User';

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
    private authService : AuthService) {

  }


  ngOnInit(): void {
      this.getDaysFromDate(this.month, this.year);
  }
    
  addNewAbsence(data: any) {
    let userInfo : User | null = this.authService.getUserInfo();
 
    if (userInfo?.withPON) {
      if(data.type != "A") return;
    }
    this.newAbsence.emit(data);
    
    if(data.class == "VAC-absence" || data.class == "OTH-absence"){
      data.class = "normal";
      data.type = "laboral";
    }
 
    else if(data.class == "normal"){
      if (data.absence_type == "VAC") {
        data.class = "VAC-absence";
      }
      else if (data.absence_type == "OTH") {
        data.class = "OTH-absence";
      }
      data.type = "A";
    }
  }

  getDaysFromDate(month: number, year: number) {
    //Fecha inicio y fecha fin
    const startDate = moment(`${year}-${month}-01`, "YYYY-M-DD");
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    //Dias de diferencia entre la fecha inicio y fecha fin
    const diffDays = endDate.diff(startDate, 'days', true);
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
          if(this.absences[i].type == "A"){
            return {
              name: dayObject.format("dddd"),
              value: a,
              indexWeek: dayObject.isoWeekday(),
              class: this.absences[i].absence_type + "-absence",
              absence_type: this.absences[i].absence_type,
              type: this.absences[i].type,
              date: dayAbsenceObject[i],
              absence: this.absences[i]
            };
          } else{
            return {
              name: dayObject.format("dddd"),
              value: a,
              indexWeek: dayObject.isoWeekday(),
              class: this.absences[i].type + "-absence",
              absence_type: this.absences[i].absence_type,
              type: this.absences[i].type,
              date: dayAbsenceObject[i],
              absence: this.absences[i]
            };
          }
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

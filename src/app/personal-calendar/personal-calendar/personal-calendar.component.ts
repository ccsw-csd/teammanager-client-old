import { Component, DebugElement, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PersonAbsenceDto } from 'src/app/core/to/PersonAbsenceDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/to/User';
import { PersonalCalendarService } from '../services/personal-calendar.service';
import { isNgTemplate } from '@angular/compiler';
import { formatDate } from '@angular/common';
 
@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit, OnChanges  {
  actualYear : number = new Date().getFullYear();
  year : number = this.actualYear;
  newAbsences: Date[] = [];
  absences: PersonAbsenceDto[] = [];
  isloading = false;
  updateDisabled = true;
  canSave : boolean = true;
  inactivityType : String = "";
  holiday : String = "Holiday";
  other: String = "Other";
  dtos: PersonAbsenceDto[] = [];
  auxDtos: PersonAbsenceDto[] = [];
  
  constructor(    
    private personalService: PersonalCalendarService,
    private authService : AuthService,
    ) {}
 
  ngOnInit(): void {
    let userInfo : User | null = this.authService.getUserInfo();
 
    if (userInfo != null)
      this.canSave = userInfo.withPON == false;
 
    this.inactivityType = this.holiday;
    this.getAbsences();
  }
  
  saveAbsences(): void{
    this.isloading = true;
 
    this.personalService.saveAbsencePersonal(this.year, this.newAbsences, this.dtos).subscribe(result => {
      this.getAbsences();
    });
  }

  addNewAbsence(data: any): void{
    this.updateDisabled = false;
    this.canSave = true;
    
    switch(data.type) {
      case "laboral":
        if (this.inactivityType == "Holiday") {
          data.type = "A";
        }
        else if (this.inactivityType == "Other") {
          data.type = "O";
        }
        let dto = new PersonAbsenceDto();
        dto.date = this.convertDateToString(data.date.toDate());
        dto.type = data.type;

        this.newAbsences.push(data.date.toDate());
 
        this.dtos.push(dto);
        break;
      case "A":
        this.newAbsences = this.newAbsences.filter(item => !this.isSameDate(item, data.date.toDate()))
        this.dtos = this.dtos.filter(item => !this.isSameDate(new Date(item.date), data.date.toDate()));
        data.type = "laboral";
        break;
      case "O":
        this.newAbsences = this.newAbsences.filter(item => !this.isSameDate(item, data.date.toDate()))
        this.dtos = this.dtos.filter(item => !this.isSameDate(new Date(item.date), data.date.toDate()));
        data.type = "laboral";
        break;
      default:
    }
  }

  isSameDate(date1 : Date, date2 : Date) : boolean {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }
 
  getAbsences(): void
  {
    this.updateDisabled = true;
    this.isloading = true;
    this.personalService.getAbsencesPersonal(this.year).subscribe(data => {
      this.absences = data;
      this.isloading = false;
 
      this.newAbsences = [];
      this.dtos = [];
      this.auxDtos = [];

      let dataCast : any = data;
 
      for (let index in dataCast) {
        let personAbsences: PersonAbsenceDto[] = dataCast[index];
  
        this.auxDtos = this.auxDtos.concat(personAbsences.filter(item => (item.type == 'A' || item.type == 'O') && item.date != undefined));
 
        this.newAbsences = this.newAbsences.concat(
          personAbsences.filter(item => (item.type == 'A' || item.type == 'O') && item.date != undefined)
                        .map(item => new Date(item.date != undefined ? item.date : ""))          
        );

        for (let i = 0; i < this.newAbsences.length; i++) {
          let dto = new PersonAbsenceDto();
          dto.date = this.convertDateToString(this.newAbsences[i]);
          if(this.auxDtos[i].date == this.convertDateToString(this.newAbsences[i]))
            dto.type = this.auxDtos[i].type;
          
          if(this.dtos.findIndex((item) => item.date === dto.date) < 0) {
            this.dtos.push(dto);
          } 
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.year = this.actualYear;
    this.getAbsences();
  }

  private convertDateToString(date : Date) : string {
    
    let locale = 'en-EN';
    return date.toLocaleDateString(locale, {year:'numeric'})+"-"
      +date.toLocaleDateString(locale, {month:'2-digit'})+"-"
      +date.toLocaleDateString(locale, {day:'2-digit'});
  }
}

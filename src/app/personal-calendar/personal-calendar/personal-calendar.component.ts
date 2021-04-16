import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PersonAbsenceDto } from 'src/app/core/person/personAbsenceDto';
import { PersonalCalendarService } from '../services/personal-calendar.service';

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit, OnChanges  {
  actualYear : number = new Date().getFullYear();
  year : number = this.actualYear;
  absences: PersonAbsenceDto[] = [];
  isloading = false;
  newAbsences: Date[] = [];

  constructor(    private personalService: PersonalCalendarService,) {}

  ngOnInit(): void {
    this.getAbsences();
  }
  
  saveAbsences(): void{
    this.isloading = true;
    this.personalService.saveAbsencePersonal(this.year, this.newAbsences).subscribe(result => {
      this.getAbsences();
    });
  }

  addNewAbsence(data: any): void{
    switch(data.type) {
      case "laboral":
        this.newAbsences.push(data.date.toDate());
        break;
      case "A":
        this.newAbsences = this.newAbsences.filter(item => !this.isSameDate(item, data.date.toDate()))
        break;
      default:
    }
  }

  isSameDate(date1 : Date, date2 : Date) : boolean {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }

  getAbsences(): void
  {
    this.isloading = true;
    this.personalService.getAbsencesPersonal(this.year).subscribe(data => {
      this.absences = data;
      this.isloading = false;

      this.newAbsences = [];
      let dataCast : any = data;

      for (let index in dataCast) {
        let personAbsences: PersonAbsenceDto[] = dataCast[index];

        this.newAbsences = this.newAbsences.concat(
          personAbsences.filter(item => item.type == 'A' && item.date != undefined)
                        .map(item => new Date(item.date != undefined ? item.date : ""))          
        );
      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.year = this.actualYear;
    this.getAbsences();
  }
  

}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  deletedAbsences: PersonAbsenceDto[] = [];

  constructor(    private personalService: PersonalCalendarService,) {}

  ngOnInit(): void {
    this.getAbsences();
  }
  saveAbsences(): void{
    this.personalService.saveAbsencePersonal(this.deletedAbsences, this.newAbsences).subscribe(result => {
      this.getAbsences();
    });
  }

  addNewAbsence(data: any): void{
    var index = -1;
    switch(data.type) {
      case "laboral":
        {
          if(data.absence == null)
            index = this.deletedAbsences.findIndex((element) => element.date == data.date);
          else
            index = this.deletedAbsences.findIndex((element) => element.date == data.absence.date);
          if(index != -1)
            this.deletedAbsences.splice(index, 1)
          if(data.absence == null)
            this.newAbsences.push(data.date);
        }
        break;
      case "A":
        {
        index = this.newAbsences.findIndex((element) => element == data.date);
        if(index != -1)
          this.newAbsences.splice(index, 1)
        if(data.absence != null)  
          this.deletedAbsences.push(data.absence);
        }
        break;
      default:
        // code block
    }
    console.log(this.newAbsences);
    console.log(this.deletedAbsences);

  }


  getAbsences(): void
  {
    this.isloading = true;
    this.personalService.getAbsencesPersonal(this.year).subscribe(data => {
      this.absences = data;
      this.isloading = false;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.year = this.actualYear;
    this.getAbsences();
  }
  

}

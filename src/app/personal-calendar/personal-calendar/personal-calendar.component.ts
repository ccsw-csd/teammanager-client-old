import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PersonalCalendarService } from '../services/personal-calendar.service';

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit, OnChanges  {
  actualYear : number = new Date().getFullYear();
  year : number = this.actualYear;
  absences: any[] = [];
  isloading = false;

  constructor(    private personalService: PersonalCalendarService,) {}

  ngOnInit(): void {
    this.getAbsences();
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
    this.year = this.actualYear;
    this.getAbsences();
  }
  

}

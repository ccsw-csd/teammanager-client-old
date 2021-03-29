import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit {
  actualYear : number = new Date().getFullYear();
  year : number = this.actualYear;

  constructor() {}

  ngOnInit(): void {}
  

}

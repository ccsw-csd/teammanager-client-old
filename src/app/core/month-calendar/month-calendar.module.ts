import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

@NgModule({
  declarations: [MonthCalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [MonthCalendarComponent]
})
export class MonthCalendarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthCalendarFestiveComponent } from './month-calendar-festive/month-calendar-festive.component';

@NgModule({
  declarations: [MonthCalendarFestiveComponent],
  imports: [
    CommonModule
  ],
  exports: [MonthCalendarFestiveComponent]
})
export class MonthCalendarFestiveModule { }

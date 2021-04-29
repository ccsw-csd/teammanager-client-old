import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCalendarComponent } from './personal-calendar/personal-calendar.component';
import { MonthCalendarModule } from 'src/app/core/month-calendar/month-calendar.module';
import {​​​​​​​​ FormsModule, ReactiveFormsModule }​​​​​​​​ from'@angular/forms';
import {​​​​​​​​ MatInputModule }​​​​​​​​ from'@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [PersonalCalendarComponent],
  imports: [
    CommonModule,
    MonthCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
    
  ]
})
export class PersonalCalendarModule { }

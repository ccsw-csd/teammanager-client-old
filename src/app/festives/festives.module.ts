import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ListadoCentrosFestivosComponent } from './festives-list/listado-centros-festivos.component';
import { EditCentroComponent } from './festives-edit/edit-centro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MonthCalendarFestiveModule } from '../core/month-calendar-festive/month-calendar-festive.module';



@NgModule({
  declarations: [ListadoCentrosFestivosComponent, EditCentroComponent],
  imports: [
    CommonModule,
    CoreModule,
    MonthCalendarFestiveModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ]})
export class FestivesModule { }

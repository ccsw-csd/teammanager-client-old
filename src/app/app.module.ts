import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { PersonalCalendarModule } from './personal-calendar/personal-calendar.module';
import { ListadoGruposModule } from './listado-grupos/listado-grupos.module';
import { ForecastListComponent } from './forecast-list/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './forecast-list/forecast-detail/forecast-detail.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ForecastListComponent,
    ForecastDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    PersonalCalendarModule,
    ListadoGruposModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

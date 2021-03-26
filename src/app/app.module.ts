import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { PersonalCalendarModule } from './personal-calendar/personal-calendar.module';
import { MonthCalendarModule } from './month-calendar/month-calendar.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ListadoGruposModule } from './listado-grupos/listado-grupos.module';
import { ForecastListComponent } from './forecast-list/forecast-list/forecast-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ForecastListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    PersonalCalendarModule,
    MonthCalendarModule,
    MatDatepickerModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    ListadoGruposModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { PersonalCalendarModule } from './personal-calendar/personal-calendar.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ListadoGruposModule } from './listado-grupos/listado-grupos.module';
import { ForecastListComponent } from './forecast-list/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './forecast-list/forecast-detail/forecast-detail.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomDateAdapter } from './core/date-adapter/custom-date-adapter';
import { FestivesModule } from './festives/festives.module';

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
    MatDatepickerModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSlideToggleModule,
    CoreModule,
    LoginModule,
    PersonalCalendarModule,
    ListadoGruposModule,
    FestivesModule,
  ],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-EN');
  }

 }

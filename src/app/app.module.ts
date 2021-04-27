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
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListadoCentrosFestivosComponent } from './listado-centros-festivos/listado-centros-festivos.component';
import { MatSortModule } from '@angular/material/sort';
import { EditCentroComponent } from './listado-centros-festivos/edit-centro/edit-centro/edit-centro.component';


@NgModule({
  declarations: [
    AppComponent,
    ForecastListComponent,
    ForecastDetailComponent,
    ListadoCentrosFestivosComponent,
    EditCentroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    PersonalCalendarModule,
    MatDatepickerModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    ListadoGruposModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

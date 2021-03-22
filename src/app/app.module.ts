import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { PersonalCalendarModule } from './personal-calendar/personal-calendar.module';
import { ListadoGruposModule } from './listado-grupos/listado-grupos.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    PersonalCalendarModule,
    ListadoGruposModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

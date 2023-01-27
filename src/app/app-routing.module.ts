import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';
import { UserResolverService } from './core/services/user-resolver.service';
import { ListadoCentrosFestivosComponent } from './festives/festives-list/listado-centros-festivos.component';
import { ForecastDetailComponent } from './forecast/forecast-detail/forecast-detail.component';
import { ForecastListComponent } from './forecast/forecast-list/forecast-list.component';
import { InconsistenciesComponent } from './inconsistencies/inconsistencies/inconsistencies.component';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos/listado-grupos.component';
import { LoginComponent } from './login/login/login.component';
import { PersonalCalendarComponent } from './personal-calendar/personal-calendar/personal-calendar.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    resolve: {user: UserResolverService, credentials: RefreshTokenResolverService},
    children: [
      { path: 'calendar', component: PersonalCalendarComponent,},
      { path: 'groups', component: ListadoGruposComponent,},
      { path: 'festives', component: ListadoCentrosFestivosComponent,},
      { path: 'forecast', component: ForecastListComponent,},
      { path: 'forecast-detail', component: ForecastDetailComponent,},
      { path: 'inconsistencies', component: InconsistenciesComponent,},
      { path: '**', redirectTo: 'calendar', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

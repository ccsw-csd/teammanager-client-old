import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { UserResolverService } from './core/services/user-resolver.service';
import { ForecastListComponent } from './forecast-list/forecast-list/forecast-list.component';
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
    resolve: {user: UserResolverService},
    children: [
      { path: 'main', component: PersonalCalendarComponent,},
      { path: 'listado-grupos', component: ListadoGruposComponent,},
      { path: 'forecast', component: ForecastListComponent,},
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

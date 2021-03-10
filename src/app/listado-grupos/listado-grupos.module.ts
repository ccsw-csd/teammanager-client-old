import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos.component';

@NgModule({
  declarations: [ListadoGruposComponent],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class ListadoGruposModule { }

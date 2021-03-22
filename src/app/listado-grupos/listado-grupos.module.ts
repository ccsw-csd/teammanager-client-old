import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos.component';
import { ListadoGruposDialogComponent } from './listado-grupos/listado-grupos-dialog/listado-grupos-dialog.component';

@NgModule({
  declarations: [ListadoGruposComponent, ListadoGruposDialogComponent],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class ListadoGruposModule { }

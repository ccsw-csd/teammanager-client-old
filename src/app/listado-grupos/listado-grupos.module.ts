import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos.component';
import { ListadoGruposDialogComponent } from './listado-grupos/listado-grupos-dialog/listado-grupos-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { DelDialogComponent } from './listado-grupos/del-dialog/del-dialog.component';


@NgModule({
  declarations: [ListadoGruposComponent, ListadoGruposDialogComponent, DelDialogComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatAutocompleteModule,
    MatButtonModule,
  ]
})
export class ListadoGruposModule { }

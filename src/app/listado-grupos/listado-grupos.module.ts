import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos.component';
import { ListadoGruposDialogComponent } from './listado-grupos/listado-grupos-dialog/listado-grupos-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteDialogComponent } from './listado-grupos/confirmDelete-dialog/confirmDelete-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ListadoGruposComponent, ListadoGruposDialogComponent, ConfirmDeleteDialogComponent, AlertDialogComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSlideToggleModule,
  ]
})
export class ListadoGruposModule { }

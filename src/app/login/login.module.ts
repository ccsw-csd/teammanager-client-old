import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { ModifyPersonComponent } from './modify-person/modify-person.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [LoginComponent, ModifyPersonComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class LoginModule { }

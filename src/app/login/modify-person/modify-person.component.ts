import { Component, Inject, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CenterDto } from 'src/app/core/center/centerDto';
import { PersonDto } from 'src/app/core/person/personDto';
import { CenterService } from 'src/app/core/services/center.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-modify-person',
  templateUrl: './modify-person.component.html',
  styleUrls: ['./modify-person.component.scss']
})
export class ModifyPersonComponent implements OnInit {

  centers: CenterDto[]|undefined;
  selectedCenter: CenterDto|undefined;
  username: String|undefined;
  name: String|undefined;
  lastname: String|undefined;
  saga: String|undefined;
  email: String|undefined;
  isloading = false;

  constructor(
    public dialogRef: MatDialogRef<ModifyPersonComponent>, 
    private snackService: SnackbarService,
    public centerService: CenterService,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    this.username = this.data.user;
    this.getCenters();
  }

  buttonSelect(option: String): void {
    switch (option) {
      case 'update':
        if ((this.lastname == "") 
           || (this.email == "") 
           || (this.name == "")
           || (this.email == null) 
           || (this.name == null)
           || (this.lastname == null) )  {
            this.snackService.showMessage('Faltan campos por rellenar');
           }
        else
          this.createInDb();
        break;
    }
  }
  getCenters(): void{
    this.centerService.getAllCenters().subscribe(result => {
      this.centers = result;
      this.selectedCenter = this.centers[0];
    });
  }

  createInDb(): void {
    const newPerson = new PersonDto();
    newPerson.id = undefined;
    newPerson.username = this.username;
    newPerson.lastname = this.lastname;
    newPerson.name = this.name;
    newPerson.email = this.email;
    newPerson.saga = this.saga;
    newPerson.center_id = this.selectedCenter?.id;
    this.isloading = true;
    this.loginService.createPerson(newPerson).subscribe((result) => {
      if(result)
      {
        this.dialogRef.close(true);
      }
      else{
        this.snackService.showMessage('El código SAGA está duplicado en BBDD. Por favor reviselo o pongase en contacto con el administrador');
        this.dialogRef.close(false);
      }
      this.isloading = false;
    });

  }
}

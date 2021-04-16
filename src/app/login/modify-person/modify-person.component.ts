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
  isloading = false;
  person: PersonDto = new PersonDto();
  title: string|undefined = "Creacion de Usuario";

  constructor(
    public dialogRef: MatDialogRef<ModifyPersonComponent>, 
    private snackService: SnackbarService,
    public centerService: CenterService,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {


    if(!this.data.create){
      this.person = this.data.person;
      this.title = "Editar información personal";
    }

    this.person.username = this.data.user;
    this.getCenters()
  }

  buttonSelect(option: String): void {
    if ((this.person.lastname == "") 
           || (this.person.email == "") 
           || (this.person.name == "")
           || (this.person.email == null) 
           || (this.person.name == null)
           || (this.person.lastname == null) )  {
            this.snackService.showMessage('Faltan campos por rellenar');
           }
    else{
      switch (option) {
        case 'create':
          this.createInDb();
          break;
        case 'update':
          this.updateInDb(this.data.person)
          break;
          
      }
    }
  }
  getCenters(): void{
    this.centerService.getAllCenters().subscribe(result => {
      this.centers = result;
      if(this.data.create){
        this.selectedCenter = this.centers[0];
      }
      else{
        this.selectedCenter =  this.centers.find( center => center.id === this.person.centerId );
      }
      
    });
  }

  createInDb(): void {
    const newPerson = new PersonDto();
    newPerson.id = undefined;
    newPerson.username = this.person.username;
    newPerson.lastname = this.person.lastname;
    newPerson.name = this.person.name;
    newPerson.email = this.person.email;
    newPerson.saga = this.person.saga;
    newPerson.centerId = this.selectedCenter?.id;
    this.isloading = true;
    this.loginService.createPerson(newPerson).subscribe((result) => {
      if(result)
      {
        this.dialogRef.close(true);
      }
      else{
        this.snackService.showMessage('El código SAGA está duplicado en BBDD. Por favor revíselo o póngase en contacto con el administrador.');
        this.dialogRef.close(false);
      }
      this.isloading = false;
    });

  }

  updateInDb(updatedPerson: PersonDto): void{
    this.isloading = true;
    updatedPerson.centerId = this.selectedCenter?.id;
    this.loginService.createPerson(updatedPerson).subscribe((result) => {
        this.dialogRef.close(true);
      this.isloading = false;
    });
  }
}

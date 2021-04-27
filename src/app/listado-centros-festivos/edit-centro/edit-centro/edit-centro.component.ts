import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Festivos } from '../../model/Festivos';
import { ListadoCentrosFestivosService } from '../../service/ListadoCentrosFestivos.service';

@Component({
  selector: 'app-edit-centro',
  templateUrl: './edit-centro.component.html',
  styleUrls: ['./edit-centro.component.scss']
})
export class EditCentroComponent implements OnInit {

  actualYear: number = new Date().getFullYear();
  year: number = this.actualYear;
  festives: Festivos[] = [];
  isLoading = false;
  newFestives: Date[] = [];
  dateFromFestives!: Date;
  constructor(
    private listadoCentrosFestivosService: ListadoCentrosFestivosService,
    @Inject(MAT_DIALOG_DATA) public ID: number,
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getFestives();
  }

  // tslint:disable-next-line: typedef
  saveFestives(){
    this.isLoading = true;
    console.log(this.newFestives);
    this.listadoCentrosFestivosService.saveFestives(this.year, this.ID, this.newFestives).subscribe(() => {
      this.getFestives();
      this.isLoading = false;
    });
  }
  // tslint:disable-next-line: typedef
  addNewFestive(data: any){
    switch (data.type) {
      case 'laboral':
        this.newFestives.push(data.date.toDate());
        break;
      case 'F':
        // tslint:disable-next-line: no-non-null-assertion
        this.newFestives = this.newFestives.filter(item => !this.isSameDate(item!, data.date.toDate()));
        break;
      default:
    }
  }
  isSameDate(date1 : Date, date2 : Date) : boolean {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }
  // tslint:disable-next-line: typedef
  getFestives(){
    this.isLoading = true;

    this.listadoCentrosFestivosService.getFestives(this.ID, this.year).subscribe(data => {
      this.festives = data;
      this.isLoading = false;

      this.newFestives = this.festives.map(item => new Date (item.date != undefined ? item.date : ""));

    });
  }

  // tslint:disable-next-line: use-lifecycle-interface typedef
  ngOnChanges(changes: SimpleChanges){
    this.year = this.actualYear;
    this.getFestives();
  }
}

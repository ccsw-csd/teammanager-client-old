import { ThrowStmt, typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ListadoGrupos } from 'src/app/listado-grupos/model/ListadoGrupos';
import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-forecast-detail',
  templateUrl: './forecast-detail.component.html',
  styleUrls: ['./forecast-detail.component.scss']
})
export class ForecastDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private forecastService: ForecastService,
    ) {this.form = this.formBuilder.group(this.formControl);}

  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;
  actualDate = new Date();
  isloading = false;
  initDate = new Date();
  endDate = new Date();
  rangeInitDate = new Date();
  rangeEndDate = new Date();
  id?: string|null;
  selectedMonth = this.actualDate.getMonth();
  dataSource = new MatTableDataSource<any>();
  countDaysTotal?: number;
  getDaysInMonth = function(year: number, month: number) {
   return new Date(year, month, 0).getDate();
  };

  public form: FormGroup;

  columns: any[] = [
    'name',
    'countLab',
    'countF',
    'countA'
  ];

  months: any[] = [
    {name:"Enero", num: 0},
    {name:"Febrero", num: 1},
    {name:"Marzo", num: 2},
    {name:"Abril", num: 3},
    {name:"Mayo", num: 4},
    {name:"Junio", num: 5},
    {name:"Julio", num: 6},
    {name:"Agosto", num: 7},
    {name:"Septiembre", num: 8},
    {name:"Octubre", num: 9},
    {name:"Noviembre", num: 10},
    {name:"Diciembre", num: 11}
  ];


  monthsHeaderExtraInfo: any[] = [
    {name:"Info", num: 4},
    {name:"Enero", num: 0},
    {name:"Febrero", num: 1},
    {name:"Marzo", num: 2},
    {name:"Abril", num: 3},
    {name:"Mayo", num: 4},
    {name:"Junio", num: 5},
    {name:"Julio", num: 6},
    {name:"Agosto", num: 7},
    {name:"Septiembre", num: 8},
    {name:"Octubre", num: 9},
    {name:"Noviembre", num: 10},
    {name:"Diciembre", num: 11}
  ];

  monthsHeader: any[] = [
    "Info"
  ];

  monthsHeaderCopy: any[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
    
  ];

  transcode: any = {};

  monthsDays: any[] = [
  ];

  myStyles = {

  }

  customer: FormControl = new FormControl();

  public formControl = {
    start: new FormControl(),
    end: new FormControl()
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe((params) => {
      this.id = params.id;
    });

    this.getAbsences();
  }

  ngAfterViewInit() {
    this.form.valueChanges.pipe(
        debounceTime(200)
    ).subscribe(event => {
        if (event.start && event.end) {
            this.rangeInitDate= event.start;
            this.rangeEndDate = event.end;
            if(this.months.length == 12)
              this.months.push(
                {name:this.rangeInitDate.toISOString().split('T')[0] + " / " + this.rangeEndDate.toISOString().split('T')[0], num: 12}
                )
            else{
              this.months.pop();
              this.months.push(
                {name:this.rangeInitDate.toISOString().split('T')[0] + " / " + this.rangeEndDate.toISOString().split('T')[0], num: 12}
                )
            }
            if(this.selectedMonth == 12)
              this.getAbsences();
        }
    });
}

  ngOnChanges() {
    this.getAbsences();
  }

  getAbsences(): void
  {
    if(this.selectedMonth != 12){
      var lastDays = this.getDaysInMonth(new Date().getFullYear(), this.selectedMonth+1);
      this.initDate = new Date(new Date().getFullYear(), this.selectedMonth);
      this.endDate = new Date(new Date().getFullYear(), this.selectedMonth, lastDays, 5);
    }
    else{
      this.initDate = this.rangeInitDate;
      this.endDate = this.rangeEndDate;
    }
    var countA;
    var countF;
    var countLabor;

    this.isloading = true;
    this.forecastService.getAbsences(Number(this.id), this.initDate, this.endDate).subscribe(data => {
      var sourceArray: any[] = [];
      this.formatMonths();
      for (var i in data){  
        countA = this.countDays(data[i], "A");
        countF = this.countDays(data[i], "F");
        countLabor = (this.countLaborDays(this.initDate, this.endDate) - (countA + countF));
        var source = {
          name: {value: i, class: "name"},
          countLab: {value: countLabor, class: "count"},
          countF: {value: countF, class: "count"},
          countA: {value: countA, class: "count"}
        }

        source = this.formatDatasource(data[i], source);
        sourceArray.push(source);
      }
      this.dataSource.data = sourceArray;
      this.isloading = false;
    });

  }

  isSticky(object: any): boolean{
    if(object == "Info" || object == "Nombre" || object == "Laborales"||object == "Ausencias"||object == "Festivos")
      return true;
    return false;  
  }

  formatMonths(): void
  {
    this.transcode = {};
    this.monthsDays = [];
    this.columns = [];
    this.monthsHeader = ['Info',];

    this.transcode["name"] = "Nombre";
    this.transcode["countLab"] = "Laborales";
    this.transcode["countF"] = "Festivos";
    this.transcode["countA"] = "Ausencias";

    this.columns.push('name');
    this.columns.push('countLab');
    this.columns.push('countF');
    this.columns.push('countA');

    this.calculateMonths();

    for(var l = 0; l < this.monthsDays.length; l++)
    {
      for(var o = this.monthsDays[l].init; o <= this.monthsDays[l].end; o++){
        this.columns.push(this.monthsDays[l].year + "/" +this.monthsDays[l].month + "/" + o);
        this.transcode[this.monthsDays[l].year + "/" +this.monthsDays[l].month + "/" + o] = o;
      }
    this.monthsHeader.push(this.monthsHeaderCopy[this.monthsDays[l].month -1]);
    this.monthsHeaderExtraInfo[this.monthsDays[l].month].num = this.monthsDays[l].number+1;
    
    }
  }

  calculateMonths(): void{
    if(this.initDate.getFullYear() == this.endDate.getFullYear()){
      if(this.initDate.getMonth()+1 == this.endDate.getMonth()+1)
        this.monthsDays.push({year: this.initDate.getFullYear(), month: this.initDate.getMonth()+1, number: this.endDate.getDate() - this.initDate.getDate(), init: this.initDate.getDate(), end:  this.endDate.getDate()}); 
      else{
        for(var i = this.initDate.getMonth()+1; i <= this.endDate.getMonth()+1; i++){
          if(i == this.initDate.getMonth()+1){
            this.monthsDays.push({year: this.initDate.getFullYear(), month: i, number: new Date(this.initDate.getFullYear(), i, 0).getDate() - (this.initDate.getDate()), init: this.initDate.getDate(), end:  new Date(this.initDate.getFullYear(), i, 0).getDate()}); 
          }
          else if(i == this.endDate.getMonth()+1){
            this.monthsDays.push({year: this.initDate.getFullYear(), month: i, number: this.endDate.getDate(), init: 1, end:  this.endDate.getDate()}); 
          }
          else
            this.monthsDays.push({year: this.initDate.getFullYear(), month: i, number: new Date(this.initDate.getFullYear(), i, 0).getDate(), init: 1, end: new Date(this.initDate.getFullYear(), i, 0).getDate()});  
       }
      }
    }
    else {
      for(var k = this.initDate.getFullYear(); k <= this.endDate.getFullYear(); k++){

        if(k == this.initDate.getFullYear()){
          for(var i = this.initDate.getMonth()+1; i <= 12; i++){
            if(i == this.initDate.getMonth()+1){
              this.monthsDays.push({year: this.initDate.getFullYear(), month: i, number: new Date(this.initDate.getFullYear(), i, 0).getDate() - (this.initDate.getDate()), init: this.initDate.getDate(), end:  new Date(this.initDate.getFullYear(), i, 0).getDate()}); 
            }
            else
              this.monthsDays.push({year: this.initDate.getFullYear(), month: i, number: new Date(this.initDate.getFullYear(), i, 0).getDate(), init: 1, end: new Date(this.initDate.getFullYear(), i, 0).getDate()});  
          }
        }
        else if(k == this.endDate.getFullYear()){
          for(var i = 1; i <= this.endDate.getMonth()+1; i++){
            if(i == this.endDate.getMonth()+1){
              this.monthsDays.push({year: this.endDate.getFullYear(), month: i, number: this.endDate.getDate(), init: 1, end:  this.endDate.getDate()}); 
            }
            else
              this.monthsDays.push({year: this.endDate.getFullYear(), month: i, number: new Date(this.endDate.getFullYear(), i, 0).getDate(), init: 1, end: new Date(this.endDate.getFullYear(), i, 0).getDate()});  
          }
        }
        else{
          for(var i = 1; i <= 12; i++){
              this.monthsDays.push({year: k, month: i, number: new Date(k, i, 0).getDate(), init: 1, end: new Date(k, i, 0).getDate()});  
          }
        }
      }
    }
  }
  getHeaderClass(object: any): string{
    if(object == "Nombre")
      return "name";
    if(object == "Laborales"||object == "Ausencias"||object == "Festivos")
      return "count"; 
    return "day";
  }

  formatDatasource(person: any, source: any): any{

    for(var l = 0; l < this.monthsDays.length; l++)
    {
      for(var o = this.monthsDays[l].init; o <= this.monthsDays[l].end; o++){

        source[this.monthsDays[l].year + "/" +this.monthsDays[l].month + "/" + o] = {value: "", class: this.typeOfDay(o,this.monthsDays[l].month, person)};
      }
    }
    return source;
  }

  countDays(data: any, type: String): number{
    let count = 0;

    if(type === "A" || type === "P"){
      for (var i in data){
        if(data[i].type === "A"  || data[i].type === "P")
          count++;
      }
    }
    else if(type === "F"){
      for (var i in data){
        if(data[i].type === "F")
          count++;
      }
    }
    return count;
  }

  countLaborDays(init: Date, end: Date): number
  {
    var workingdays = 0;
    var weekday     = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";

    while (init <= end) 
    {
        var day = weekday[init.getDay()];
        if(day != "Saturday" && day != "Sunday") 
        {
            workingdays++; 
        }

        init = new Date(init.getFullYear(), init.getMonth(), init.getDate() + 1); 
    }
    return workingdays;
  }

  typeOfDay(day: number, month: number, absences: any): string{
    var date = new Date(2021, month-1, day);
    for(var i = 0; i < absences.length; i++){
      if((date.toISOString().substring(0, 10).localeCompare(absences[i].date)) == 0)
      {
        if(absences[i].type == "A" || absences[i].type == "P")
          return "Ausencia";
        return "Festivo"
      }  
    }
    if((date.getDay() === 6) || (date.getDay() === 0))
      return "Weekend";
    else
      return "Laboral";
  }
}

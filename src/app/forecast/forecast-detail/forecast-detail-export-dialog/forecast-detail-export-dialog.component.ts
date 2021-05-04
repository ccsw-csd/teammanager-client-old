import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/core/alert-dialog/alert-dialog.component';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-forecast-detail-export-dialog',
  templateUrl: './forecast-detail-export-dialog.component.html',
  styleUrls: ['./forecast-detail-export-dialog.component.scss']
})
export class ForecastDetailExportDialogComponent implements OnInit {
  isloading: boolean = false;
  type: any = 1;
  Difference_In_Time = this.data.end - this.data.init;
  Difference_In_Days = this.Difference_In_Time / (1000 * 3600 * 24);


  constructor(    public dialogRef: MatDialogRef<ForecastDetailExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private forecastService: ForecastService,
    public dialog: MatDialog,
    ) {
      this.type = 1; 
    }



  ngOnInit(): void {
    if (this.data.init.getMonth() == this.data.end.getMonth() && this.data.init.getYear() == this.data.end.getYear()) {
      this.type = 1;
      this.export();
    }
  }
  close(): void{
    this.dialogRef.close();
  }
  export(): void{
    if(this.type == 1){
      if(this.Difference_In_Days < 250 ){
        this.isloading = true;
        this.forecastService.exportForecast(this.data.groupId, this.convertDateToString(this.data.init), this.convertDateToString(this.data.end), this.type).subscribe(result => {
          this.downLoadFile(result, "application/ms-excel");
          this.isloading = false;
          this.dialogRef.close();
        }); 
      } else{
        this.dialog.open(AlertDialogComponent, {width: '500px', height: '250px', data: {
          titulo: 'Error', 
          informacion: 'To export data with "All in One", the total days must be less than 250 days.'}
        });

        this.dialogRef.close();
      }
    }
    else{
      this.isloading = true;
        this.forecastService.exportForecast(this.data.groupId, this.data.init, this.data.end, this.type).subscribe(result => {
          this.downLoadFile(result, "application/ms-excel");
          this.isloading = false;
          this.dialogRef.close();
        }); 
    }

  }

  private convertDateToString(date : Date) : string {
    
    let locale = 'en-EN';
    return +date.toLocaleDateString(locale, {year:'numeric'})+"-"
      +date.toLocaleDateString(locale, {month:'2-digit'})+"-"
      +date.toLocaleDateString(locale, {day:'2-digit'});
  }

  
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);


    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = 'ForecastDetail.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
}

}

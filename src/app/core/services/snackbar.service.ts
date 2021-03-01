import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar,) { }


  public error(text: string) : void {
    this.snackBar.open(text, 'Error', {
      duration: 5000,
      panelClass: ['snackbar-red'],
    });
  }
}

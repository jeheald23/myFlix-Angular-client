import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

}

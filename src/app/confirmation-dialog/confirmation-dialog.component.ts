import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public snackBar: MatSnackBar,
    private router: Router // Inject Router module
  ) { }

  confirmDelete(): void {
    // Call the removeUser method from FetchApiDataService to delete the user profile
    this.fetchApiData.deleteUser().subscribe(
      () => {
        // On success, close the dialog and show a success message
        this.dialogRef.close();
        localStorage.clear();
        this.snackBar.open('User profile deleted successfully!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['/welcome']); // Navigate to the welcome page
      },
      (error) => {
        // On error, show an error message
        this.snackBar.open(error, 'OK', {
          duration: 2000
        });
      }
    );
  }

  cancelDelete(): void {
    // This method will be called when the user cancels the action
    this.dialogRef.close(); // Close the dialog without performing any action
  }
  
}

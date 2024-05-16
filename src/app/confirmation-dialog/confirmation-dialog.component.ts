import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router module

/**
 * Component for displaying a confirmation dialog.
 */
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

  /**
   * Confirms user deletion.
   * Calls the removeUser method from FetchApiDataService to delete the user profile.
   * On success, closes the dialog, clears local storage, shows a success message,
   * and navigates to the welcome page.
   * On error, shows an error message.
   */
  confirmDelete(): void {
    this.fetchApiData.deleteUser().subscribe(
      () => {
        this.dialogRef.close();
        localStorage.clear();
        this.snackBar.open('User profile deleted successfully!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['/welcome']); // Navigate to the welcome page
      },
      (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000
        });
      }
    );
  }

  /**
   * Cancels user deletion.
   * Closes the dialog without performing any action.
   */
  cancelDelete(): void {
    this.dialogRef.close(); // Close the dialog without performing any action
  }
}


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveUserComponent } from '../remove-user/remove-user.component';

/**
 * Represents the user's profile card.
 */
@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
  }
  
  /**
   * Opens the dialog window to remove the user.
   */
  openRemoveUser(): void {
    const dialogRef = this.dialog.open(RemoveUserComponent, {
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteUser();
      }
    });
  }

  /**
   * Deletes the user.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      (result) => {
        // Logic for a successful user deletion goes here! (To be implemented)
        console.log(result);
        this.snackBar.open('User deleted successfully!', 'OK', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
        let errorMessage = 'An error occurred during user deletion.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response
        }
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000
        });
      }
    );
  }
}

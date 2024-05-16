import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component responsible for updating user information.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  /** Input data for updating user information. */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /** Output event emitter for updating user information. */
  @Output() updateUserEvent = new EventEmitter<any>();

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar
  ) { }

  /** Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit(): void {
  }

  /**
   * Updates the user information.
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('User profile updated successfully!', 'OK', {
          duration: 2000
        });
        this.updateUserEvent.emit(this.userData); // Emit event with updated user data
      },
      (error) => {
        console.log(error);
        let errorMessage = 'An error occurred updating user profile.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response
        }
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000
        });
      }
    );
  }

  /**
   * Cancels the update action.
   */
  cancelUpdate(): void {
    // This method will be called when the user cancels the action
    this.dialogRef.close(); // Close the dialog without performing any action
  }
}

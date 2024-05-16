// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

registerUser(): void {
  // Check if any of the fields are empty
  if (!this.userData.Username || !this.userData.Password || !this.userData.Email || !this.userData.Birthday) {
    this.snackBar.open('All fields are required.', 'OK', {
      duration: 2000
    });
    return; // Stop further execution
  }

  // Check if the username is less than 5 characters
  if (this.userData.Username.length < 5) {
    this.snackBar.open('Username must be at least 5 characters long.', 'OK', {
      duration: 2000
    });
    return; // Stop further execution
  }

  // If all validations pass, proceed with user registration
  this.fetchApiData.userRegistration(this.userData).subscribe(
    (result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    },
    (error) => {
      console.log(error);
      let errorMessage = 'An error occurred during user registration.';
      if (error && error.error && error.error.message) {
        // Use the error message from the API response
        if (error.error.message === 'Username is already taken') {
          errorMessage = 'Username is already taken. Please choose a different username.';
        }
      }
      this.snackBar.open(errorMessage, 'OK', {
        duration: 2000
      });
    }
  );
}
}
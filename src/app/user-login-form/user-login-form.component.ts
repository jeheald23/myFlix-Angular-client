import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component responsible for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /** Input data for the user login form. */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /** Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit(): void {
  }

  /**
   * Logs in the user.
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        // Navigate to the 'movies' route upon successful login
        this.router.navigate(['movies']);
      },
      (error) => {
        console.error(error);
        // Show a user-friendly message for unsuccessful login attempts
        this.snackBar.open('Login failed. Please check your credentials.', 'OK', {
          duration: 2000
        });
      }
    );
  }

}


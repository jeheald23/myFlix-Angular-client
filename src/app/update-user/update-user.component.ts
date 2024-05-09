import { Component, OnInit, Input  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

updateUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe(
    (result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('User profile update successfully!', 'OK', {
        duration: 2000
      });
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
}
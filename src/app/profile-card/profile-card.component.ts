import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: any = {}; // Define user object
  userData: any = {}; // Define userData object

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  // Function to get user profile
  public getProfile(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result; // Assign the fetched user data to the user object
      this.userData.userName = this.user.userName; // Use user.username to set userName
      this.userData.email = this.user.email; // Use user.email to set email
      if (this.user.birthday) {
        let Birthday = new Date(this.user.birthday);
        if (!isNaN(Birthday.getTime())) {
          this.userData.birthday = Birthday.toISOString().split('T')[0];
        }
      }
    });
  }
  

  // Function to open the dialog to update the user
  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '280px'
    });
  }

  // Function to delete the user 
  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '280px'
    });
  }
}

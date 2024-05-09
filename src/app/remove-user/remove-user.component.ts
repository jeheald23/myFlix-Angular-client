import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    public snackBar: MatSnackBar,
    private dialog: MatDialog // Inject the MatDialog service
  ) { }

  ngOnInit(): void {
  }

 


  /**
   * This method will delete the user's account
   */ 
  removeUser(): void {
    this.fetchApiData.deleteUser().subscribe((resp) => {
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.clear();
      this.snackBar.open('User profile deleted successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}


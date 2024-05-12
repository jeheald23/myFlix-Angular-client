import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: any = {};
  userData: any = {};
  favoriteMovies: any[] = [];
  
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result; // Assign the fetched user data to the user object
      this.userData.userName = this.user.Username; // Use user.username to set userName
      this.userData.email = this.user.Email; // Use user.email to set email
      this.userData.birthday = this.user.Birthday;

      this.getFavoriteMovies(); // Fetch favorite movies after getting user profile
    });
  }
  
  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '280px'
    });
  }

  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '280px'
    });
  }

  getFavoriteMovies(): void {
    // Fetch only the favorite movies based on the user's profile
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // Check if this.user and this.user.Favorites are defined
      if (this.user && this.user.Favorites) {
        this.favoriteMovies = resp.filter((movie: any) => 
          this.user.Favorites.includes(movie._id)
        );
      }
    });
  }
  
  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        genre: genre,
        description: description
      },
      width: '500px'
    });
  }
  
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: name,
        bio: bio
      },
      width: '500px'
    });
  }
  
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: title,
        description: description
      },
      width: '500px'
    });
  }
}


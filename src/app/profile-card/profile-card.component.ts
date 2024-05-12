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
  FavoriteMovies: any[] = [];
  
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
      if (this.user && this.user.FavoriteMovies) {
        this.FavoriteMovies = resp.filter((movie: any) => 
          this.user.FavoriteMovies.includes(movie._id)
        );
      }
    });
  }
  
  /**
    * Checks if a movie is in the user's favorite list.
    * @param movie - The movie to check.
    * @returns True if the movie is in the favorite list, false otherwise.
    */
  isFav(movie: any): boolean {
    return this.FavoriteMovies.some((favMovie: any) => favMovie._id === movie._id);
  }

  /**
    * Toggles a movie in the user's favorite list.
    * @param movie - The movie to toggle.
    */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavoriteMovie(movie)
      : this.addFavoriteMovie(movie);
  }

  /**
     * Adds a movie to the user's favorite list.
     * @param movie - The movie to add to favorites.
     */
  addFavoriteMovie(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData.addFavoriteMovies(parsedUser.Username, movie._id).subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        // Add the movie to the favoritemovie array
        this.FavoriteMovies.push(movie);
        // Show a snack bar message
        this.snackBar.open(`${movie.title} has been added to your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite list.
     * @param movie - The movie to remove from favorites.
     */
  deleteFavoriteMovie(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData.deleteFavoriteMovie(parsedUser.Username, movie._id).subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        // Remove the movie from the favoritemovie array
        this.FavoriteMovies = this.FavoriteMovies.filter((favMovie: any) => favMovie._id !== movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.title} has been removed from your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
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


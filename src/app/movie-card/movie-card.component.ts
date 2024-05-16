import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Component for displaying movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies and favorite movies of the user.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      let user = localStorage.getItem('user');
      if (user) {
        let parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.Favorites) {
          this.favoriteMovies = resp.filter((movie: any) =>
            parsedUser.FavoriteMovies.includes(movie._id)
          );
        }
      }
    });
  }

  /**
   * Opens a dialog displaying movie genre and description.
   * @param genre - The genre of the movie.
   * @param description - The description of the genre.
   */
  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        genre: genre,
        description: description
      },
      width: '500px'
    });
  }

  /**
   * Opens a dialog displaying movie director information.
   * @param name - The name of the director.
   * @param bio - The biography of the director.
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: name,
        bio: bio
      },
      width: '500px'
    });
  }

  /**
   * Opens a dialog displaying movie synopsis.
   * @param title - The title of the movie.
   * @param description - The synopsis of the movie.
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: title,
        description: description
      },
      width: '500px'
    });
  }

  /**
   * Checks if a movie is in the user's favorite list.
   * @param movie - The movie to check.
   * @returns True if the movie is in the favorite list, false otherwise.
   */
  isFav(movie: any): boolean {
    return this.favoriteMovies.some((favMovie: any) => favMovie._id === movie._id);
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
        this.favoriteMovies.push(movie);
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
        this.favoriteMovies = this.favoriteMovies.filter((favMovie: any) => favMovie._id !== movie._id);
        this.snackBar.open(`${movie.title} has been removed from your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }
}

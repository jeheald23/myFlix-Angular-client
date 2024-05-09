// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  genres: any[] = [];
  directors: any[] = [];
  synopsis: any[] = [];
 
constructor(
  public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  public snackBar: MatSnackBar
) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Movie, NewMovie } from '../models/movie';

@Service()
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/movies';

  readonly movies = signal<Movie[]>([]);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      tap((movies) => this.movies.set(movies)),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http
      .get<Movie>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  addMovie(movie: NewMovie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      tap((newMovie) => this.movies.update((movies) => [...movies, newMovie])),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${movie.id}`, movie).pipe(
      tap((updatedMovie) =>
        this.movies.update((movies) =>
          movies.map((item) => (item.id === updatedMovie.id ? updatedMovie : item)),
        ),
      ),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  deleteMovie(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.movies.update((movies) => movies.filter((movie) => movie.id !== id))),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Se ha producido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Codigo de error del servidor: ${error.status}, mensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

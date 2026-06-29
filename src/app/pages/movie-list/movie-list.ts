import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewMovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Peliculas</h1>
      <form class="grid gap-3 rounded border border-slate-200 p-4" (submit)="addMovie($event)">
        <h2 class="text-xl font-semibold text-slate-900">Añadir nueva pelicula</h2>

        <label class="grid gap-1 text-sm font-medium text-slate-800" for="new-title">
          Titulo
          <input
            class="rounded border border-slate-300 px-3 py-2"
            id="new-title"
            name="title"
            required
            type="text"
            [value]="newTitle()"
            (input)="newTitle.set(readInput($event))"
          />
        </label>

        <label class="grid gap-1 text-sm font-medium text-slate-800" for="new-director">
          Director
          <input
            class="rounded border border-slate-300 px-3 py-2"
            id="new-director"
            name="director"
            required
            type="text"
            [value]="newDirector()"
            (input)="newDirector.set(readInput($event))"
          />
        </label>

        <label class="grid gap-1 text-sm font-medium text-slate-800" for="new-genre">
          Genero
          <input
            class="rounded border border-slate-300 px-3 py-2"
            id="new-genre"
            name="genre"
            required
            type="text"
            [value]="newGenre()"
            (input)="newGenre.set(readInput($event))"
          />
        </label>

        <button
          class="w-fit rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          [disabled]="adding()"
          type="submit"
        >
          {{ adding() ? 'Añadiendo...' : 'Añadir nueva pelicula' }}
        </button>
      </form>

      @if (error()) {
        <p class="rounded border border-red-300 bg-red-50 p-3 text-red-800" role="alert">
          {{ error() }}
        </p>
      }

      @if (loading()) {
        <p class="text-slate-700">Cargando peliculas...</p>
      } @else if (movies().length === 0) {
        <p class="rounded border border-slate-200 p-4 text-slate-700">
          Todavia no hay peliculas.
        </p>
      } @else {
        <ul class="grid gap-3 sm:grid-cols-2">
          @for (movie of movies(); track movie.id) {
            <li class="rounded border border-slate-200 p-4">
              <a
                class="font-semibold text-slate-900 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-500"
                [routerLink]="['/movies', movie.id]"
              >
                {{ movie.title }}
              </a>
              <p class="mt-2 text-sm text-slate-700">{{ movie.director }} - {{ movie.genre }}</p>
            </li>
          }
        </ul>
      }
    </section>
  `,
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  protected readonly movies = this.movieService.movies;
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly newTitle = signal('');
  protected readonly newDirector = signal('');
  protected readonly newGenre = signal('');
  protected readonly adding = signal(false);

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: () => {
        this.error.set('');
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    });
  }

  protected addMovie(event: Event): void {
    event.preventDefault();

    if (this.adding()) {
      return;
    }

    const movie: NewMovie = {
      title: this.newTitle().trim(),
      director: this.newDirector().trim(),
      genre: this.newGenre().trim(),
    };

    if (!movie.title || !movie.director || !movie.genre) {
      this.error.set('Completa todos los campos.');
      return;
    }

    this.error.set('');
    this.adding.set(true);

    this.movieService.addMovie(movie).subscribe({
      next: () => {
        this.newTitle.set('');
        this.newDirector.set('');
        this.newGenre.set('');
        this.error.set('');
        this.adding.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.adding.set(false);
      },
    });
  }

  protected readInput(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}

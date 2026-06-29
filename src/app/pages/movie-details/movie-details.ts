import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  template: `
    <section class="space-y-4">
      @if (loading()) {
        <p class="text-slate-700">Cargando pelicula...</p>
      } @else if (movie(); as selectedMovie) {
        <h1 class="text-3xl font-bold text-slate-900">{{ selectedMovie.title }}</h1>
        <dl class="space-y-2 text-slate-700">
          <div>
            <dt class="font-semibold text-slate-900">Director</dt>
            <dd>{{ selectedMovie.director }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-slate-900">Genero</dt>
            <dd>{{ selectedMovie.genre }}</dd>
          </div>
        </dl>

        <div class="flex flex-wrap gap-3">
          <button
            class="rounded border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            data-testid="edit-movie"
            [disabled]="saving() || deleting()"
            type="button"
            (click)="startEdit(selectedMovie)"
          >
            Editar
          </button>
          <button
            class="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            data-testid="delete-movie"
            [disabled]="deleting()"
            type="button"
            (click)="removeMovie(selectedMovie.id)"
          >
            {{ deleting() ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>

        @if (error()) {
          <p class="rounded border border-red-300 bg-red-50 p-3 text-red-800" role="alert">
            {{ error() }}
          </p>
        }

        @if (editing()) {
          <form class="grid gap-3 rounded border border-slate-200 p-4" (submit)="saveMovie($event)">
            <h2 class="text-xl font-semibold text-slate-900">Editar pelicula</h2>

            <label class="grid gap-1 text-sm font-medium text-slate-800" for="edit-title">
              Titulo
              <input
                class="rounded border border-slate-300 px-3 py-2"
                id="edit-title"
                name="title"
                required
                type="text"
                [value]="editTitle()"
                (input)="editTitle.set(readInput($event))"
              />
            </label>

            <label class="grid gap-1 text-sm font-medium text-slate-800" for="edit-director">
              Director
              <input
                class="rounded border border-slate-300 px-3 py-2"
                id="edit-director"
                name="director"
                required
                type="text"
                [value]="editDirector()"
                (input)="editDirector.set(readInput($event))"
              />
            </label>

            <label class="grid gap-1 text-sm font-medium text-slate-800" for="edit-genre">
              Genero
              <input
                class="rounded border border-slate-300 px-3 py-2"
                id="edit-genre"
                name="genre"
                required
                type="text"
                [value]="editGenre()"
                (input)="editGenre.set(readInput($event))"
              />
            </label>

            <button
              class="w-fit rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              [disabled]="saving()"
              type="submit"
            >
              {{ saving() ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </form>
        }
      } @else {
        <h1 class="text-3xl font-bold text-slate-900">Pelicula no encontrada</h1>
        <p class="text-slate-700">No hemos encontrado esa pelicula.</p>
      }

      <button
        class="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
        type="button"
        (click)="backToList()"
      >
        Volver al listado
      </button>
    </section>
  `,
})
export class MovieDetailsComponent implements OnInit {
  readonly movieId = input.required<string>();

  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  protected readonly movie = signal<Movie | undefined>(undefined);
  protected readonly loading = signal(true);
  protected readonly editing = signal(false);
  protected readonly editTitle = signal('');
  protected readonly editDirector = signal('');
  protected readonly editGenre = signal('');
  protected readonly error = signal('');
  protected readonly saving = signal(false);
  protected readonly deleting = signal(false);

  ngOnInit(): void {
    this.movieService.getMovieById(this.movieId()).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.error.set('');
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected backToList(): void {
    void this.router.navigate(['/movies']);
  }

  protected startEdit(movie: Movie): void {
    this.error.set('');
    this.editTitle.set(movie.title);
    this.editDirector.set(movie.director);
    this.editGenre.set(movie.genre);
    this.editing.set(true);
  }

  protected saveMovie(event: Event): void {
    event.preventDefault();
    const currentMovie = this.movie();

    if (!currentMovie) {
      return;
    }

    if (this.saving()) {
      return;
    }

    const updatedMovie: Movie = {
      id: currentMovie.id,
      title: this.editTitle().trim(),
      director: this.editDirector().trim(),
      genre: this.editGenre().trim(),
    };

    if (!updatedMovie.title || !updatedMovie.director || !updatedMovie.genre) {
      this.error.set('Completa todos los campos.');
      return;
    }

    this.error.set('');
    this.saving.set(true);

    this.movieService.updateMovie(updatedMovie).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.editing.set(false);
        this.saving.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.saving.set(false);
      },
    });
  }

  protected removeMovie(id: string): void {
    if (this.deleting()) {
      return;
    }

    this.error.set('');
    this.deleting.set(true);

    this.movieService.deleteMovie(id).subscribe({
      next: () => this.backToList(),
      error: (error: Error) => {
        this.error.set(error.message);
        this.deleting.set(false);
      },
    });
  }

  protected readInput(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}

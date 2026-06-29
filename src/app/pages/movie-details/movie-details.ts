import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  template: `
    <section class="space-y-4">
      @if (movie(); as selectedMovie) {
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
export class MovieDetailsComponent {
  readonly movieId = input.required<string>();
  readonly deleteMovie = output<string>();

  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  protected readonly movie = computed(() =>
    this.movieService.movies().find((movie) => movie.id === this.movieId()),
  );

  protected backToList(): void {
    void this.router.navigate(['/movies']);
  }
}

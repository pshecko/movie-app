import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Peliculas</h1>
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
    </section>
  `,
})
export class MovieListComponent {
  private readonly movieService = inject(MovieService);
  protected readonly movies = this.movieService.movies;
}

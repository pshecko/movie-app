import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Peliculas</h1>
      <p class="text-slate-700">Aqui aparecera el catalogo de peliculas.</p>
    </section>
  `,
})
export class MovieListComponent {}

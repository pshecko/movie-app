import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Detalle de pelicula</h1>
      <p class="text-slate-700">Aqui apareceran los detalles de la pelicula seleccionada.</p>
    </section>
  `,
})
export class MovieDetailsComponent {}

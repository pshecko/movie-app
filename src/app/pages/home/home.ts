import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">Bienvenido al Catalogo de Peliculas</h1>
      <p class="max-w-2xl text-slate-700">
        Usa la navegacion para ver el listado y consultar los detalles de cada pelicula.
      </p>
    </section>
  `,
})
export class HomeComponent {}

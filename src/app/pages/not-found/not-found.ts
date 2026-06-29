import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="space-y-4">
      <h1 class="text-3xl font-bold text-slate-900">404 - Pagina no encontrada</h1>
      <p class="text-slate-700">La ruta que has intentado visitar no existe.</p>
      <a
        class="inline-block rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
        routerLink="/"
      >
        Volver al inicio
      </a>
    </section>
  `,
})
export class NotFoundComponent {}

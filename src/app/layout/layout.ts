import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="border-b border-slate-200 bg-white">
      <nav class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <a class="text-lg font-semibold text-slate-900" routerLink="/">Movie App</a>

        <div class="flex gap-4">
          <a
            class="rounded px-2 py-1 text-slate-700 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500"
            routerLink="/"
            routerLinkActive="font-semibold underline"
            ariaCurrentWhenActive="page"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Inicio
          </a>
          <a
            class="rounded px-2 py-1 text-slate-700 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500"
            routerLink="/movies"
            routerLinkActive="font-semibold underline"
            ariaCurrentWhenActive="page"
          >
            Peliculas
          </a>
        </div>
      </nav>
    </header>

    <main class="mx-auto min-h-[70vh] max-w-4xl px-4 py-8">
      <router-outlet />
    </main>

    <footer class="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-600">
      Movie App - ejercicio Angular
    </footer>
  `,
})
export class LayoutComponent {}

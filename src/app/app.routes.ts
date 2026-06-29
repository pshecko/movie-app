import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'movies',
        loadComponent: () => import('./pages/movie-list/movie-list').then((m) => m.MovieListComponent),
      },
      {
        path: 'movies/:movieId',
        loadComponent: () =>
          import('./pages/movie-details/movie-details').then((m) => m.MovieDetailsComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];

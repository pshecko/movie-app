import { Service, signal } from '@angular/core';
import { Movie } from '../models/movie';

@Service()
export class MovieService {
  readonly movies = signal<Movie[]>([
    {
      id: '1',
      title: 'El laberinto del fauno',
      director: 'Guillermo del Toro',
      genre: 'Fantasia',
    },
    {
      id: '2',
      title: 'Todo sobre mi madre',
      director: 'Pedro Almodovar',
      genre: 'Drama',
    },
    {
      id: '3',
      title: 'Los lunes al sol',
      director: 'Fernando Leon de Aranoa',
      genre: 'Drama social',
    },
  ]);
}

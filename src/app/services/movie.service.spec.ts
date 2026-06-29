import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Movie, NewMovie } from '../models/movie';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let http: HttpTestingController;
  const apiUrl = 'http://localhost:3000/movies';

  const mockMovies: Movie[] = [
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MovieService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('retrieves movies with GET', async () => {
    const response = firstValueFrom(service.getMovies());
    const req = http.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);

    expect(await response).toEqual(mockMovies);
    expect(service.movies()).toEqual(mockMovies);
  });

  it('retrieves one movie by id with GET', async () => {
    const response = firstValueFrom(service.getMovieById('1'));
    const req = http.expectOne(`${apiUrl}/1`);

    expect(req.request.method).toBe('GET');
    req.flush(mockMovies[0]);

    expect(await response).toEqual(mockMovies[0]);
  });

  it('adds a movie with POST', async () => {
    const newMovie: NewMovie = {
      title: 'Mar adentro',
      director: 'Alejandro Amenabar',
      genre: 'Drama',
    };
    const returnedMovie: Movie = { id: '3', ...newMovie };

    const response = firstValueFrom(service.addMovie(newMovie));
    const req = http.expectOne(apiUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMovie);
    req.flush(returnedMovie);

    expect(await response).toEqual(returnedMovie);
    expect(service.movies()).toContainEqual(returnedMovie);
  });

  it('updates a movie with PUT', async () => {
    service.movies.set(mockMovies);
    const updatedMovie: Movie = { ...mockMovies[0], genre: 'Fantasia oscura' };

    const response = firstValueFrom(service.updateMovie(updatedMovie));
    const req = http.expectOne(`${apiUrl}/1`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedMovie);
    req.flush(updatedMovie);

    expect(await response).toEqual(updatedMovie);
    expect(service.movies()[0].genre).toBe('Fantasia oscura');
  });

  it('deletes a movie with DELETE', async () => {
    service.movies.set(mockMovies);

    const response = firstValueFrom(service.deleteMovie('1'));
    const req = http.expectOne(`${apiUrl}/1`);

    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(await response).toBeNull();
    expect(service.movies().map((movie) => movie.id)).toEqual(['2']);
  });

  it('returns a readable error when the API fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = firstValueFrom(service.getMovies());
    const req = http.expectOne(apiUrl);

    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    await expect(response).rejects.toThrow('Codigo de error del servidor: 404');
    consoleSpy.mockRestore();
  });
});

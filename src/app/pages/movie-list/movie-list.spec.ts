import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from './movie-list';

describe('MovieListComponent', () => {
  let http: HttpTestingController;
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
    {
      id: '3',
      title: 'Los lunes al sol',
      director: 'Fernando Leon de Aranoa',
      genre: 'Drama social',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [MovieService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('renders starter movies as detail links', () => {
    const fixture = TestBed.createComponent(MovieListComponent);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/movies').flush(mockMovies);
    fixture.detectChanges();

    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];

    expect(fixture.nativeElement.textContent).toContain('Peliculas');
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'El laberinto del fauno',
      'Todo sobre mi madre',
      'Los lunes al sol',
    ]);
    expect(links[0].getAttribute('href')).toBe('/movies/1');
  });

  it('adds a movie with the simple form', () => {
    const fixture = TestBed.createComponent(MovieListComponent);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/movies').flush(mockMovies);
    fixture.detectChanges();

    const [titleInput, directorInput, genreInput] = Array.from(
      fixture.nativeElement.querySelectorAll('input'),
    ) as HTMLInputElement[];
    titleInput.value = 'Mar adentro';
    titleInput.dispatchEvent(new Event('input'));
    directorInput.value = 'Alejandro Amenabar';
    directorInput.dispatchEvent(new Event('input'));
    genreInput.value = 'Drama';
    genreInput.dispatchEvent(new Event('input'));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    const req = http.expectOne('http://localhost:3000/movies');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      title: 'Mar adentro',
      director: 'Alejandro Amenabar',
      genre: 'Drama',
    });
    req.flush({
      id: '4',
      title: 'Mar adentro',
      director: 'Alejandro Amenabar',
      genre: 'Drama',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Mar adentro');
  });
});

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MovieDetailsComponent } from './movie-details';

describe('MovieDetailsComponent', () => {
  let http: HttpTestingController;
  const selectedMovie: Movie = {
    id: '1',
    title: 'El laberinto del fauno',
    director: 'Guillermo del Toro',
    genre: 'Fantasia',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [MovieService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('shows the selected movie from the route id input', () => {
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    fixture.componentRef.setInput('movieId', '1');
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/movies/1').flush(selectedMovie);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('El laberinto del fauno');
    expect(fixture.nativeElement.textContent).toContain('Guillermo del Toro');
    expect(fixture.nativeElement.textContent).toContain('Fantasia');
  });

  it('shows a simple message when the movie does not exist', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    fixture.componentRef.setInput('movieId', '999');
    fixture.detectChanges();
    http
      .expectOne('http://localhost:3000/movies/999')
      .flush('Not found', { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hemos encontrado esa pelicula.');
    consoleSpy.mockRestore();
  });

  it('deletes the movie and returns to the list', () => {
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.componentRef.setInput('movieId', '1');
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/movies/1').flush(selectedMovie);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[data-testid="delete-movie"]').click();
    const req = http.expectOne('http://localhost:3000/movies/1');

    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(navigateSpy).toHaveBeenCalledWith(['/movies']);
  });

  it('updates the movie with the inline edit form', () => {
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    fixture.componentRef.setInput('movieId', '1');
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/movies/1').flush(selectedMovie);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[data-testid="edit-movie"]').click();
    fixture.detectChanges();

    const genreInput = fixture.nativeElement.querySelector('#edit-genre') as HTMLInputElement;
    genreInput.value = 'Fantasia oscura';
    genreInput.dispatchEvent(new Event('input'));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    const req = http.expectOne('http://localhost:3000/movies/1');

    expect(req.request.method).toBe('PUT');
    expect(req.request.body.genre).toBe('Fantasia oscura');
    req.flush({ ...selectedMovie, genre: 'Fantasia oscura' });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Fantasia oscura');
  });
});

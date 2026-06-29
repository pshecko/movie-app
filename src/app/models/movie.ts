export interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
}

export type NewMovie = Omit<Movie, 'id'>;

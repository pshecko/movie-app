import { routes } from './app.routes';

describe('routes', () => {
  it('keeps the movie pages inside the shared layout', () => {
    const layoutRoute = routes.find((route) => route.path === '');

    expect(layoutRoute?.children?.map((route) => route.path)).toEqual([
      '',
      'home',
      'movies',
      'movies/:movieId',
    ]);
    expect(layoutRoute?.children?.find((route) => route.path === 'home')?.redirectTo).toBe('');
  });

  it('keeps the wildcard route outside the layout', () => {
    expect(routes.at(-1)?.path).toBe('**');
  });
});

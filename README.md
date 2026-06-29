# Movie App

Angular coursework project for a small movie catalog. The app follows the
requirements in `briefing.md`: routed pages, a shared layout, dynamic movie
details, 404 handling, and CRUD operations through `HttpClient`.

## Stack

- Angular 22
- Standalone components and lazy-loaded routes
- Signals for local component state
- Tailwind CSS 4
- `json-server` for the local movie API
- Vitest through the Angular unit-test builder

## Setup

Install dependencies:

```bash
npm ci
```

Run the local API in one terminal:

```bash
npm run api
```

Run Angular in another terminal:

```bash
npm start
```

Open `http://localhost:4200`.

## Routes

- `/` - home page
- `/home` - redirects to `/`
- `/movies` - movie list and add form
- `/movies/:movieId` - movie details, edit, and delete actions
- any unknown route - 404 page

## Local API

The app reads and writes movies at:

```text
http://localhost:3000/movies
```

Seed data lives in `db.json`. Keep `npm run api` running while testing list,
details, add, edit, and delete flows in the browser.

## Useful Commands

Run unit and accessibility checks:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

The production output is written under:

```text
dist/movie-app/browser
```

## Deployment Note

The GitHub Pages workflow starts `json-server` during the build job so API
dependent checks have local data available in CI.

GitHub Pages is still a static host. It can serve the Angular build, but it
does not keep `json-server` running after deployment. Browser CRUD calls on the
deployed site still need a real hosted API if full runtime CRUD is required.

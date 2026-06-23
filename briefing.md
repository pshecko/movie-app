# Movie App

## Objetivo

Construir una aplicación de gestión de películas con Angular que incluirá:

- Una página de inicio (`Home`).
- Un listado de películas (`MovieList`).
- Una página de detalles para cada película (`MovieDetails`).
- Gestión de errores 404 para rutas no encontradas.

### Actividad 1: Configuración Básica de Enrutamiento y Rutas Estáticas

En esta actividad configurarás el módulo de enrutamiento de Angular y definirás las rutas básicas estáticas para una aplicación de películas (Movie App).

#### Objetivo

- Configurar el Router de Angular.
- Crear y asociar componentes a rutas.
- Implementar navegación básica con `routerLink`.

#### Pasos a Seguir

1. Crea un nuevo proyecto Angular con el nombre **`movie-app`** con estilos de `tailwindCSS`

- Esto generará un proyecto con los componentes autónomos por defecto y un archivo de rutas inicial (`src/app/app.routes.ts`).

2. Crear componentes básicos de página:

- Genera los componentes:
  - home
  - movie-list
  - movie-details
  - not-found
- Dentro de cada componente, simplemente añade un `h1` con el nombre de la página (ej: `<h1>Bienvenido al Catálogo de Películas</h1>` en el componente `Home`).

3. Configura las siguientes rutas en `src/app/app.routes.ts`:

- ruta raíz: **''** al componente **"Home"**,
- ruta de redirección al componente **"Home"**. Trabaja el atributo `pathMatch`.
- ruta **'movies'** al componente **MovieList**,
- ruta dinámica: **'movies/:movieId'** al componente **MovieDetails**,
- ruta comodín:**'\*\*'** al componente **NotFound**

4. En la plantilla `src/app/app.html`:

- Limpia el código dejando solo la etiqueta <router-outlet />
- Crea una barra de navegación con las siguientes indicaciones:
  - Ruta Inicio --> "/"
  - Ruta Películas --> "movies"
- Resalta las rutas activas con negrita o subrayado.
  (_tip: investiga las propiedades `routerLink` y `routerLinkActiveOptions`_)

5. Da estilos a la barra de navegación.

6. Verifica que la navegación entre las páginas "Inicio" y "Películas" funciona.

### Actividad 2: Rutas Dinámicas y Navegación Programática

Implementarás rutas dinámicas para mostrar los detalles de películas individuales y aprenderás a navegar programáticamente entre rutas.

#### Objetivo

- Definir rutas con parámetros de URL.
- Acceder a los parámetros de ruta utilizando `ActivatedRoute` o `input` signals y `withInputBinding()`.
- Utilizar `Router` para la navegación programática.

#### Pasos a Seguir

1. Usa un **servicio** para proporcionar datos al catálogo:

- Crea un servicio con el nombre `movies-service` que incluya un array de 3 películas de prueba. Los datos serán:
- id (string)
- title (string)
- director (string)
- genre (string)
- Crea un `interface` con el nombre `Movie`, en un archivo aparte para tipar los datos del array.

2. Modifica el componente `MovieList` para mostrar un listado de películas y enlaces dinámicos:

- Inyecta el servicio `MovieService` en el componente `MovieList`.
- Lee la lista de películas en el template.
- Crea enlaces a cada película utilizando `routerLink` con un array de parámetros para la ruta dinámica: `[routerLink]="['/movies', movie.id]"`.

3. Modifica el componente `MovieDetails` para acceder a los parámetros de ruta:

- Sigue la [documentación oficial](https://angular.dev/guide/routing/read-route-state) para obtener el parámetro de la ruta: `movieId`.
- Con el `movieId`, busca la película correspondiente en tu array de datos.
- Implementa un botón "Volver al listado" que utilice la navegación programática con `Router.navigate()` para volver al listado.
- Incorpora en el template una vista para el caso de que el parámetro no devuelva ninguna película. (_tip: utiliza @if para la renderización selectiva_)

4. Aplica estilos a la lista y a la ficha de la película.

5. Re-factoriza el proyecto para recuperar el parámetro mediante **Input Signal**. Puedes seguir la [documentación](https://angular.dev/guide/routing/common-router-tasks) para hacer esto.

### Actividad 3: Rutas Anidadas, Layout y Gestión de Errores 404

Refactoriza la estructura de rutas para incluir un layout compartido e implementa la gestión de rutas no encontradas.

#### Objetivo

- Crear un componente de layout para una estructura de página compartida.
- Utilizar rutas anidadas para organizar la navegación.
- Implementar una ruta comodín para gestionar errores 404.
- Realizar redirecciones de rutas.

#### Pasos a Seguir

1. Crea un componente `Layout`:

- Genera un nuevo componente: `layout`.
- En `layout.ts`, asegúrate de importar `RouterOutlet` y `RouterLink`.
- En la plantilla del componente `Layout`, añade la estructura de tu layout (cabecera, navegación, pie de página) y un `router-outlet` en el área del contenido principal.

2. Refactoriza `app.routes.ts` para utilizar rutas anidadas con el `Layout`:

- Define una ruta principal que utilice `Layout` y añade las demás rutas como hijos dentro de un array `children`.
- Asegúrate de que el componente `NotFound` se mantiene fuera de las rutas anidadas para capturar cualquier ruta no válida.

3. Crea el contenido de la página 404 e introduce una ruta inexistente para probarla.

### Actividad 4: Creación de un Servicio de Datos y Uso de HttpClient (GET)

Crearás un servicio para interactuar con la API de películas TMDB, utilizando `HttpClient` para obtener datos.

#### Objetivo

- Modificar el servicio `MovieService` para recuperar los datos desde la API.
- Realizar una solicitud GET para obtener una lista de películas.
- Consumir el Observable devuelto en un componente.

#### Pasos a Seguir

1. **Crea una nueva rama:**

- Haz `commit` en la rama `main` y crea una nueva rama llamada `feature/http`.

3. Crea una interfaz para la entidad `Movie`, si no la habías creado antes.

4. Instala el cliente Http siguiendo la [documentación oficial](https://angular.dev/guide/http/setup)

5. Implementa los métodos de gestión de las películas en el servicio `MovieService`; para ello deberás llamar a los métodos de la librería [`HttpClient`](https://angular.dev/guide/http/making-requests)

- Crea el método **`getMovies()`** o, si ya lo habías generado, reescríbelo para que devuelva un `Observable<Movie[]>`. _Tip: utiliza el operador [catchError](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch) para manejar errores_.
- Incorpora un método en el servicio para manejar errores; este es un buen ejemplo:

  ```typescript
  /**
   * @returns Un Observable que lanza el error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '¡Se ha producido un error desconocido!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // La API ha devuelto un código de error
      errorMessage = `Código de error del servidor: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  ```

6. Investiga cómo convertir los datos del observable en un signal para consumirlos en el componente `MovieListComponent`.

7. **Verifica el comportamiento:** Inicia la aplicación Angular y comprueba que las películas se cargan correctamente desde `http://localhost:3000/movies`.

### Actividad 5: Operaciones CRUD (POST, PUT, DELETE) con HttpClient

Extenderás el `MovieService` para permitir la creación, actualización y eliminación de películas a través de la API.

#### Objetivo

- Implementar métodos POST, PUT y DELETE en el servicio.
- Añadir funcionalidades al `MovieListComponent` para interactuar con estos métodos.
- Gestionar el estado de las películas en `MovieService` (el servicio con Signals que se verá en la siguiente unidad) después de cada operación con éxito.

#### Pasos a Seguir

1. Añade métodos en `MovieService`; utiliza la [documentación oficial](https://angular.dev/guide/http/making-requests) para ver cómo funcionan estos métodos.

- `getMovieById(id: string)` devuelve un `Observable<Movie>`
- `addMovie(movie: Omit<Movie, 'id'>)` devuelve `Observable<Movie>` _Tip: la API simulada json-server asigna el ID automáticamente._
- `updateMovie(movie: Movie)` devuelve `Observable<Movie>`
- `deleteMovie(id: string)` devuelve `Observable<unknown>` _Tip: `unknown` porque la respuesta puede ser vacía o un objeto simple._

2. Modifica `MovieListComponent` y `MovieDetails` para utilizar estos métodos:

- **Botón de añadir película:** Añade un botón "Añadir nueva película" en el componente `MovieList`. Cuando se haga clic, llama a `movieService.addMovie()` con datos de prueba o un formulario simple.
- **Eliminar película:** En el componente `MovieDetails`, el botón "Eliminar" debería emitir un `output` con el ID de la película. El componente `MovieList` escuchará ese `output` y llamará a `movieService.deleteMovie(id)`.
- **Actualizar película:** (Opcional) Crea un componente `MovieEditComponent` o una funcionalidad de edición en línea que permita modificar una película y llamar a `movieService.updateMovie()`.

3. **Verifica el comportamiento:** Prueba a añadir y eliminar películas. Observa cómo los cambios se reflejan en tiempo real gracias a la recuperación de datos tras cada operación.

### Actividad 6: Unit Testing de Servicios con `HttpClientTestingModule`

**Descripción:** Aprenderás a escribir tests unitarios para tu `MovieService`, simulando las respuestas del `HttpClient` sin hacer llamadas de red reales.

#### Objetivo

- Configurar el `TestBed` para testing de servicios HTTP.
- Utilizar `provideHttpClientTesting()` y `HttpTestingController`.
- Escribir tests para los métodos GET, POST, PUT y DELETE del `MovieService`.
- Afirmar las solicitudes HTTP y las respuestas.
- Gestionar errores simulados.

#### Pasos a Seguir

1. **Crea el archivo de test para `MovieService`:**

- Si generaste el servicio con `--skip-tests`, crea el archivo manualmente: `src/app/services/movie-api.service.spec.ts`.

2. **Configura la estructura básica del test:**

Comienza con esta estructura inicial y complétala siguiendo la documentación:

```typescript
// src/app/services/movie-api.service.spec.ts
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MovieService } from "./movie-api.service";
import { Movie } from "../interfaces/movie.interface";

describe("MovieService", () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;
  const apiUrl = "http://localhost:3000/movies";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        // TODO: Configura los providers necesarios para el testing HTTP
      ],
    });

    // TODO: Inyecta el servicio y el HttpTestingController
  });

  afterEach(() => {
    // TODO: Verifica que no haya peticiones HTTP pendientes
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // TODO: Implementa los siguientes tests (GET, POST, PUT, DELETE)
});
```

3. **Implementa el test para el método GET:**

Crea un test que verifique que el método `getMovies()` funciona correctamente:

```typescript
it("should retrieve all movies via GET", () => {
  // TODO: Crea datos mock para las películas
  const mockMovies: Movie[] = [
    // Añade 2-3 películas de prueba
  ];

  // TODO: Llama al método getMovies() y verifica la respuesta
  // Utiliza service.getMovies().subscribe() para verificar el resultado

  // TODO: Utiliza httpTestingController.expectOne() para verificar la petición
  // Verifica que el método HTTP sea 'GET'
  // Utiliza req.flush() para simular la respuesta del servidor
});
```

4. **Implementa el test para el método POST:**

```typescript
it("should add a movie via POST", () => {
  // TODO: Crea una nueva película sin ID
  const newMovie: Omit<Movie, "id"> = {
    // Completa con las propiedades necesarias
  };

  // TODO: Crea la respuesta esperada del servidor (con ID asignado)
  const returnedMovie: Movie = {
    // Completa con las propiedades incluyendo el ID
  };

  // TODO: Implementa el test siguiendo el mismo patrón que el GET
});
```

5. **Implementa el test para el método DELETE:**

```typescript
it("should delete a movie via DELETE", () => {
  const movieIdToDelete = "1";

  // TODO: Implementa el test para el DELETE
  // Nota: Las operaciones DELETE a menudo devuelven null o undefined
  // La URL debería ser `${apiUrl}/${movieId}`
});
```

6. **(OPCIONAL) Implementa el test para el método PUT:**

```typescript
it("should update a movie via PUT", () => {
  // TODO: Crea una película actualizada
  const updatedMovie: Movie = {
    // Completa con las propiedades actualizadas
  };

  // TODO: Implementa el test
  // Nota: La URL debería ser `${apiUrl}/${movieId}`
});
```

7. **(OPCIONAL) Implementa el test para la gestión de errores:**

```typescript
it("should handle HTTP errors gracefully", () => {
  const errorMessage = "Test 404 Error";

  // TODO: Implementa un test que simule un error 404
  // Utiliza req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
});
```

8. **Ejecuta los tests:** `ng test`. Asegúrate de que todos los tests del servicio pasen correctamente.

9. **BONUS: Ejercicio de Extensión**

Una vez hayas completado los tests básicos, prueba a añadir:

1. **Test para `getMovieById()`**: Verifica que se pueda obtener una película específica por ID.
2. **Tests con diferentes códigos de error**: Prueba errores 500, 401, etc.
3. **Tests con timeouts**: Simula peticiones que tardan demasiado tiempo.

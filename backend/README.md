# FIFA World Culture Hub BFF

REST API backend built with Node.js, Express and TypeScript using Clean Architecture.

## Folder structure

```text
backend/
+-- package.json
+-- tsconfig.json
+-- .env.example
+-- README.md
`-- src/
    +-- app.ts
    +-- server.ts
    +-- domain/
    |   +-- entities/
    |   |   +-- Country.ts
    |   |   +-- Team.ts
    |   |   `-- User.ts
    |   +-- errors/
    |   |   `-- AppError.ts
    |   +-- repositories/
    |   |   +-- ICountryRepository.ts
    |   |   +-- ITeamRepository.ts
    |   |   `-- IUserRepository.ts
    |   `-- types/
    |       `-- CompareCountriesResult.ts
    +-- application/
    |   `-- use-cases/
    |       +-- CompareCountriesUseCase.ts
    |       +-- GetCountriesUseCase.ts
    |       +-- GetCountryByNameUseCase.ts
    |       `-- GetTeamsByCountryUseCase.ts
    +-- infrastructure/
    |   +-- config/
    |   |   `-- env.ts
    |   +-- data/
    |   |   +-- fallbackCountries.ts
    |   |   +-- fallbackTeams.ts
    |   |   `-- footballData.json
    |   +-- http/
    |   |   +-- RestCountriesClient.ts
    |   |   `-- SportsDbClient.ts
    |   `-- repositories/
    |       +-- CountryRepository.ts
    |       +-- TeamRepository.ts
    |       `-- InMemoryUserRepository.ts
    `-- interfaces/
        +-- controllers/
        |   +-- CompareController.ts
        |   +-- CountryController.ts
        |   +-- TeamController.ts
        |   `-- UserController.ts
        +-- middleware/
        |   `-- errorHandlers.ts
        `-- routes/
            +-- compareRoutes.ts
            +-- countryRoutes.ts
            +-- index.ts
            +-- teamRoutes.ts
            `-- userRoutes.ts
```

## Endpoints

- `GET /api/health`
- `GET /api/countries`
- `GET /api/countries/:name`
- `GET /api/teams/:country`
- `GET /api/compare?c1=Argentina&c2=Brazil`
- `GET /api/users`
- `GET /api/users?email=gmail`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## How to run

1. Open a terminal in the `backend` folder.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` if you want to customize the defaults.
   - Use `BACKEND_PORT` to change the API port (default `4000`).
4. Start the project in development:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

6. Start the compiled server:

```bash
npm start
```

Default local URL:

```text
http://localhost:4000/api
```

## Request flow

Each request follows the same path:

1. A route receives the HTTP request.
2. The route calls a controller.
3. The controller reads params/query and delegates to a use case.
4. The use case coordinates the business action.
5. The use case calls a repository interface.
6. The repository implementation talks to external APIs or local data.
7. The normalized result goes back to the controller.
8. The controller sends the HTTP JSON response.

Example for `GET /api/countries`:

`route -> CountryController -> GetCountriesUseCase -> CountryRepository -> RestCountriesClient + footballData.json -> response`

If an external API fails, the repositories return simple in-memory fallback data so the frontend still receives a valid response.

## User CRUD flow (Clean Architecture)

Request and response flow for `users`:

1. Route in `interfaces/routes/userRoutes.ts` receives HTTP call.
2. `UserController` reads params/query/body and delegates to a use case.
3. Use case in `application/use-cases` applies business rules and validations.
4. Use case depends on `IUserRepository` contract from `domain/repositories`.
5. `InMemoryUserRepository` in `infrastructure/repositories` persists users in memory.
6. Controller returns JSON response.

## Params and query params

- **Path params**: `GET /api/users/:id` and `PUT/DELETE /api/users/:id`
  - Example: `/api/users/9e9c4f31-ff12-4e6d-8ff9-f32ca53a9d30`
- **Query params**: `GET /api/users?email=gmail`
  - Filters users by email substring (case-insensitive).

## Test with Postman (local)

Base URL:

```text
http://localhost:4000/api
```

1. **Health check**
   - `GET {{baseUrl}}/health`
2. **Create user**
   - `POST {{baseUrl}}/users`
   - Body JSON:
   ```json
   {
     "name": "Juan Perez",
     "email": "juan@example.com"
   }
   ```
3. **List users**
   - `GET {{baseUrl}}/users`
4. **Get by id**
   - `GET {{baseUrl}}/users/{id}`
5. **Update**
   - `PUT {{baseUrl}}/users/{id}`
   - Body JSON:
   ```json
   {
     "name": "Juan P. Actualizado",
     "email": "juan.p@example.com"
   }
   ```
6. **Delete**
   - `DELETE {{baseUrl}}/users/{id}`

### Important note

`InMemoryUserRepository` stores data in memory only. If you restart the backend process, users are reset.

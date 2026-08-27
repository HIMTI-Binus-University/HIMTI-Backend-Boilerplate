# HIMTI Backend Boilerplate

Backend boilerplate for HIMTI applications. It provides a small Express API,
PostgreSQL access through Prisma, request validation, and generated API
documentation without requiring every feature to use unnecessary layers.

## Project Structure

```text
<project-name>/
├── prisma/
│   └── schema.prisma           # Database schema and Prisma configuration
├── src/
│   ├── config/                 # Shared application and database configuration
│   ├── docs/                   # OpenAPI registration and documentation routes
│   ├── features/               # Business features grouped by domain
│   ├── middleware/             # Shared Express middleware
│   ├── routes/                 # Top-level API route registration
│   ├── utils/                  # Shared backend utilities
│   └── index.ts                # Application entry point
├── .env.example                # Local environment variable template
├── docker-compose.yml          # API and PostgreSQL development services
├── Dockerfile                  # API development image
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

Create business features in `src/features/<feature>`. See
`src/features/README.md` for the expected feature structure.

## Technology Stack and Libraries

Versions are defined in `package.json`.

| Library | Purpose |
| --- | --- |
| Node.js and TypeScript | Run the API with static type checking. |
| Express | Define HTTP middleware, routes, and request handlers. |
| Prisma and PostgreSQL | Define the data model and access persisted data. |
| Zod | Validate request data and define typed schemas. |
| OpenAPI and Scalar | Generate an API contract and interactive documentation. |
| ESLint and Prettier | Check and format source code. |

## Getting Started with Docker

This is the recommended local setup. It runs the API and PostgreSQL in
containers with source code mounted for automatic reloads.

### Prerequisites

- Docker Engine with Docker Compose

### Run the Application

1. Create the local environment file:

```bash
cp .env.example .env
```

2. Build and start the services:

```bash
docker compose up --build
```

The API is available at `http://localhost:8000`. PostgreSQL is available on
host port `5432`, and its data persists in the `postgres-data` Docker volume.

Compose replaces the host-based database URL from `.env` with the internal
`postgres` service address. The same `.env` file therefore works for Docker
and native development.

Stop the services with:

```bash
docker compose down
```

Add `--volumes` only when you also want to delete the local PostgreSQL data:

```bash
docker compose down --volumes
```

Run backend commands inside the API container with `docker compose exec`. For
example:

```bash
docker compose exec api npm run prisma:generate
docker compose exec api npm run prisma:migrate -- --name your_migration_name
docker compose exec api npm run prisma:studio
```

## Getting Started without Docker

### Prerequisites

- Node.js 22 or newer
- npm
- PostgreSQL 16 or a compatible PostgreSQL server

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create the local environment file:

```bash
cp .env.example .env
```

3. Start PostgreSQL. You can use an existing installation or only run the
   database service from this repository:

```bash
docker compose up -d postgres
```

4. Update `DATABASE_URL` in `.env` if your PostgreSQL credentials, port, or
   database name differ from the example values.

5. Generate Prisma Client and start the server:

```bash
npm run prisma:generate
npm run dev
```

The API is available at `http://localhost:8000` with the example environment
values.

## Environment Variables

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `8000` | Port used by the Express server. |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/himti_backend?schema=public` | PostgreSQL connection URL for native development. |
| `CORS_ORIGIN` | `http://localhost:3000` | Frontend origin allowed to make credentialed API requests. |
| `ENABLE_API_DOCS` | `true` | Enables the OpenAPI JSON and Scalar documentation routes. |

Do not commit `.env` or place secrets in `.env.example`.

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check the API process status. |
| `GET` | `/api/openapi.json` | View the generated OpenAPI document. |
| `GET` | `/api/docs` | Open the Scalar API documentation. |

The documentation endpoints are available when `ENABLE_API_DOCS=true`.

## Request Flow

Features generally follow this flow when every layer is needed:

```text
Route -> Controller (schema validation) -> Service -> Repository -> Prisma
```

- Routes define endpoint paths and mount feature routers.
- Controllers validate input and translate HTTP requests and responses.
- Zod schemas define accepted request data.
- Services contain business rules.
- Repositories contain Prisma queries.

Start with only the files a feature needs. A small feature does not need every
layer immediately. Mount new feature routes in `src/routes/routes.ts` and
register their OpenAPI definitions in `src/docs` when they are externally
accessible.

## Database Changes

Update `prisma/schema.prisma`, then create and apply a development migration:

```bash
npm run prisma:migrate -- --name your_migration_name
```

Regenerate Prisma Client after schema changes when it is not generated by the
migration command:

```bash
npm run prisma:generate
```

Commit the schema and generated migration files together.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the API in watch mode. |
| `npm run build` | Compile TypeScript into `dist`. |
| `npm start` | Run the compiled API. |
| `npm run lint` | Check backend TypeScript with ESLint. |
| `npm run format` | Format the repository with Prettier. |
| `npm run prisma:migrate` | Create and apply a development migration. |
| `npm run prisma:generate` | Generate Prisma Client. |
| `npm run prisma:studio` | Open Prisma Studio. |

## Contributing

Keep changes focused and add only the feature layers that current behavior
requires. Before opening a pull request, run:

```bash
npm run lint
npm run build
```

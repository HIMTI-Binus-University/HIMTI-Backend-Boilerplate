# Root Team Member List API

Root Team Member List API is a standalone backend mini project for beginner web development training. It demonstrates Express backend basics, HIMTI-style feature architecture, request body handling, JSON responses, validation, Prisma ORM, PostgreSQL, and simple CRUD operations.

This project is not part of the real HIMTI Internal Backend repository. It is a learning project that follows the same feature-based code organization while keeping its own simple role/member database logic.

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod
- OpenAPI and Scalar docs
- dotenv
- tsx
- ESLint and Prettier

## Folder Structure

```txt
src/
├── config/
│   └── prisma.ts
├── docs/
│   ├── commonSchemas.ts
│   ├── docsRoutes.ts
│   ├── healthDocs.ts
│   ├── openapi.ts
│   └── zodOpenApi.ts
├── features/
│   ├── roles/
│   │   ├── roleRoutes.ts
│   │   ├── roleController.ts
│   │   ├── roleService.ts
│   │   ├── roleRepository.ts
│   │   ├── roleSchema.ts
│   │   ├── roleTypes.ts
│   │   └── roleDocs.ts
│   └── members/
│       ├── memberRoutes.ts
│       ├── memberController.ts
│       ├── memberService.ts
│       ├── memberRepository.ts
│       ├── memberSchema.ts
│       ├── memberTypes.ts
│       └── memberDocs.ts
├── middleware/
│   └── errorMiddleware.ts
├── routes/
│   └── routes.ts
├── utils/
│   └── appError.ts
└── index.ts
```

## Setup Instructions

1. Install dependencies.

```bash
npm install
```

2. Copy the environment file.

```bash
cp .env.example .env
```

3. Start PostgreSQL with Docker.

```bash
docker compose up -d
```

4. Run the database migration.

```bash
npx prisma migrate dev
```

5. Seed sample data.

```bash
npm run prisma:seed
```

6. Start the development server.

```bash
npm run dev
```

The API runs at `http://localhost:3000` by default.

Set `ENABLE_API_DOCS=true` in `.env` to serve OpenAPI JSON at `/api/openapi.json` and Scalar docs at `/api/docs`.

## Prisma Commands

```bash
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
npm run prisma:seed
```

## API Endpoints

### Health Check

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/api/health` | Check if the API is live |

### Roles

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/roles`    | Get all roles      |
| GET    | `/api/role/:id` | Get one role by id |
| POST   | `/api/role`     | Create a role      |
| PATCH  | `/api/role/:id` | Update a role      |
| DELETE | `/api/role/:id` | Delete a role      |

### Members

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/api/members`    | Get all members with role data |
| GET    | `/api/member/:id` | Get one member with role data  |
| POST   | `/api/member`     | Create a member                |
| PATCH  | `/api/member/:id` | Update a member                |
| DELETE | `/api/member/:id` | Delete a member                |

## Example Request Bodies

### Create Role

```json
{
   "name": "Manager",
   "description": "Leads the team"
}
```

### Update Role

```json
{
   "description": "Leads and supports the team"
}
```

### Create Member

```json
{
   "name": "Daffa",
   "email": "daffa@example.com",
   "generation": 2026,
   "roleId": 1
}
```

### Update Member

```json
{
   "roleId": 2
}
```

Use `null` for `roleId` if a member should not have a role.

```json
{
   "roleId": null
}
```

## Response Format

Success response:

```json
{
   "msg": "success",
   "data": {
      "id": 1,
      "name": "Daffa",
      "email": "daffa@example.com",
      "generation": 2026,
      "roleId": 1
   }
}
```

Error response:

```json
{
   "status": "fail",
   "msg": "Member not found"
}
```

Validation error response:

```json
{
   "errors": {
      "_errors": [],
      "email": {
         "_errors": ["Invalid email address"]
      }
   }
}
```

## Notes for Students

- Routes only define endpoint paths and middleware order.
- Controllers validate requests, call services, and shape responses.
- Services contain business rules, such as checking duplicate emails.
- Repositories contain database queries using Prisma.
- Docs files register OpenAPI paths for each feature.
- Zod validates incoming request bodies and route parameters.
- Prisma `include` is used in member queries to return related role data.

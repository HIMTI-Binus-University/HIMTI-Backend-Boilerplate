# Demo Steps: Root Team Member List API

Use this guide to live-code or explain the project during a beginner backend training session.

## 1. Explain Project Goal

Teaching notes:

- We are building a REST API, not a frontend website.
- The API manages Root Team roles and members.
- Students will learn how a backend receives requests, validates data, talks to a database, and returns JSON.
- Keep the project simple: no authentication, no permissions, no frontend.

Suggested explanation:

```txt
Today we will build a backend API for managing team roles and members.
The frontend can later call this API to display, create, update, and delete data.
```

## 2. Explain Backend Folder Structure

Teaching notes:

- Show the `src` folder first.
- Explain that each feature has its own folder.
- A feature folder keeps related files close together.
- This style makes larger backend projects easier to organize.

Important folders:

- `config`: shared configuration, such as Prisma client setup.
- `features`: main business features, such as roles and members.
- `middleware`: reusable Express middleware.
- `routes`: combines feature routes.
- `utils`: helper classes and response helpers.

## 3. Setup Express Server

Teaching notes:

- Express creates the HTTP server.
- `express.json()` allows the API to read JSON request bodies.
- `/api/health` is a simple endpoint to check if the server is running.
- `dotenv` reads environment variables from `.env`.

Files to explain:

- `src/index.ts`
- `.env.example`

Command:

```bash
npm run dev
```

Test health check:

```txt
GET http://localhost:3000/api/health
```

## 4. Setup Prisma and Database Schema

Teaching notes:

- Prisma is an ORM, which helps TypeScript code talk to the database.
- PostgreSQL stores the actual data.
- `schema.prisma` defines the database tables as models.
- `Role` has many `Member` records.
- `Member` can belong to one `Role`.

Files to explain:

- `prisma/schema.prisma`
- `src/config/prisma.ts`
- `docker-compose.yml`

Commands:

```bash
docker compose up -d
npx prisma migrate dev
npm run prisma:seed
```

Optional visual explanation:

```txt
Role 1 ---- many Members
Member many ---- 1 Role
```

## 5. Create Role Feature First

Teaching notes:

- Start with `Role` because `Member` can reference a role.
- Show each file in order: routes, controller, service, repository, schema, types, docs.
- Explain that `name` is required and unique.
- Explain why deleting a role with members is blocked.

Files to explain:

- `src/features/roles/roleRoutes.ts`
- `src/features/roles/roleController.ts`
- `src/features/roles/roleService.ts`
- `src/features/roles/roleRepository.ts`
- `src/features/roles/roleSchema.ts`
- `src/features/roles/roleTypes.ts`
- `src/features/roles/roleDocs.ts`

Endpoints to test:

```txt
GET    /api/roles
GET    /api/role/1
POST   /api/role
PATCH  /api/role/1
DELETE /api/role/1
```

Example body:

```json
{
   "name": "Manager",
   "description": "Leads the team"
}
```

## 6. Create Member Feature Second

Teaching notes:

- Build members after roles because members can use `roleId`.
- Explain required fields: `name`, `email`, and `generation`.
- Explain that email must be valid and unique.
- Explain that `roleId` is optional, but must exist if provided.

Files to explain:

- `src/features/members/memberRoutes.ts`
- `src/features/members/memberController.ts`
- `src/features/members/memberService.ts`
- `src/features/members/memberRepository.ts`
- `src/features/members/memberSchema.ts`
- `src/features/members/memberTypes.ts`
- `src/features/members/memberDocs.ts`

Endpoints to test:

```txt
GET    /api/members
GET    /api/member/1
POST   /api/member
PATCH  /api/member/1
DELETE /api/member/1
```

Example body:

```json
{
   "name": "Daffa",
   "email": "daffa@example.com",
   "generation": 2026,
   "roleId": 1
}
```

## 7. Explain Route -> Controller -> Service -> Repository Flow

Teaching notes:

- This is the most important architecture concept in the session.
- Use one endpoint as an example, such as `POST /api/member`.
- Show how the request moves through the code.

Flow:

```txt
Request
-> Route
-> Controller
-> Zod Schema
-> Service
-> Repository
-> Prisma
-> PostgreSQL
-> JSON Response
```

Simple explanation:

- Route: decides which controller function should run.
- Controller: validates request data and sends response data.
- Zod schema: defines the accepted request body, params, and query.
- Service: applies business logic.
- Repository: runs database queries.

## 8. Test Endpoints Using Postman or Thunder Client

Teaching notes:

- Show students how to set method, URL, headers, and JSON body.
- Use `Content-Type: application/json` for requests with a body.
- Test both success and error cases.

Recommended tests:

- `GET /api/health`
- `GET /api/roles`
- `POST /api/role` with valid body.
- `POST /api/role` with missing name.
- `GET /api/members`
- `POST /api/member` with invalid email.
- `POST /api/member` with a role id that does not exist.

Validation error example to demonstrate:

```json
{
   "email": "not-an-email"
}
```

## 9. Show How Prisma Include Is Similar to SQL JOIN

Teaching notes:

- `GET /api/members` returns member data and role data together.
- In SQL, this is commonly done using `JOIN`.
- In Prisma, we can use `include` to request related data.

Code to show:

```ts
return prisma.member.findMany({
   include: {
      role: true,
   },
});
```

SQL comparison:

```sql
SELECT members.*, roles.*
FROM members
LEFT JOIN roles ON members.role_id = roles.id;
```

Simple explanation:

```txt
Prisma include asks Prisma to also fetch related data.
For beginners, you can think of it like a join written in TypeScript style.
```

## 10. Explain How Frontend Can Later Call This API

Teaching notes:

- The backend and frontend communicate through HTTP.
- A frontend can use `fetch` or Axios to call these endpoints.
- The backend returns JSON, and the frontend displays it.

Example frontend call:

```ts
const response = await fetch('http://localhost:3000/api/members');
const result = await response.json();

console.log(result.data);
```

Final explanation:

```txt
The backend owns the data and rules.
The frontend asks the backend for data and shows it to users.
```

## Suggested Demo Order

1. Run the API and open `/api/health`.
2. Open the Prisma schema and explain models.
3. Open the role feature and create/test roles.
4. Open the member feature and create/test members.
5. Show validation errors.
6. Show `include` returning role data with members.
7. End with a frontend `fetch` example.

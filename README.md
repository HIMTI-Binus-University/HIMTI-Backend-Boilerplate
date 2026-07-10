# Root Team Member List API

Root Team Member List API is a standalone backend mini project for HIMTI Activists in Commission 3, also known as Komisi Tiga or Komtig. This project is here to help you get comfortable with how a backend receives requests, validates data, talks to a database, and returns JSON responses.

This project is not the real HIMTI Internal Backend, so it is safe to use as a learning playground. The code follows the same HIMTI-style feature architecture, but the logic stays simple: managing root team roles and members.

If you are cloning this as a Komtig activist, take your time with it. Read one feature at a time, try the endpoints, break things locally, fix them again, and use this project to understand the flow before jumping into bigger backend projects.

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

The folders are arranged to look and feel like a HIMTI backend project. Each feature owns its own routes, controller, service, repository, schema, types, and docs file so you always know where a certain responsibility belongs.

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

Follow these steps after cloning the project. This guide avoids Docker because this project is meant for you Komtig activists who are still getting comfortable with backend basics.

### 1. Install Node.js and npm

Install the Node.js LTS version. `npm` will be installed together with Node.js.

#### Windows

Recommended beginner-friendly way:

1. Open <https://nodejs.org>.
2. Download the LTS installer for Windows.
3. Run the installer and keep the default options.
4. Restart your terminal after installation.

Alternative with PowerShell if you already have `winget`:

```powershell
winget install OpenJS.NodeJS.LTS
```

#### macOS

Recommended beginner-friendly way:

1. Open <https://nodejs.org>.
2. Download the LTS installer for macOS.
3. Run the installer and keep the default options.
4. Restart your terminal after installation.

Alternative with Homebrew if you already use it:

```bash
brew install node
```

#### Linux Ubuntu/Debian

Use `nvm` so your Node.js version is easier to manage later.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

If you use `zsh`, run this instead of `source ~/.bashrc`:

```bash
source ~/.zshrc
```

#### Check the installation

Run these commands in a new terminal:

```bash
node -v
npm -v
```

If both commands print version numbers, you are good to continue.

### 2. Install PostgreSQL

This project needs PostgreSQL because Prisma will store roles and members in a local database.

#### Windows and macOS

Recommended beginner-friendly way:

1. Open <https://www.postgresql.org/download/>.
2. Choose your operating system.
3. Install PostgreSQL with the default options.
4. When the installer asks for a password for the `postgres` user, use `postgres` so it matches `.env.example`.

#### Linux Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

If your PostgreSQL username or password is different, update `DATABASE_URL` in `.env` later.

### 3. Create the local database

Create a database named `root_team_member_list`.

If you use pgAdmin, create it from the UI. If you use terminal, you can try:

```bash
createdb root_team_member_list
```

If that command does not work on your device, do not panic. Open pgAdmin, connect to your local PostgreSQL server, and create a database with the same name manually.

### 4. Install project dependencies

Run this inside the project folder:

```bash
npm install
```

### 5. Copy the environment file

For macOS/Linux:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
copy .env.example .env
```

The default database URL is:

```txt
postgresql://postgres:postgres@localhost:5432/root_team_member_list?schema=public
```

If your PostgreSQL password is not `postgres`, change the second `postgres` in `DATABASE_URL` to your own password.

### 6. Run Prisma migration

This creates the database tables from `prisma/schema.prisma`.

```bash
npx prisma migrate dev
```

### 7. Seed sample data

This adds sample roles and members so the API has data to return.

```bash
npm run prisma:seed
```

### 8. Start the development server

```bash
npm run dev
```

The API runs at `http://localhost:3000` by default.

Set `ENABLE_API_DOCS=true` in `.env` to serve OpenAPI JSON at `/api/openapi.json` and Scalar docs at `/api/docs`.

The docs page is helpful when you want to explore the API without memorizing every endpoint.

## Prisma Commands

Use these commands when you need to work with your local database during practice.

```bash
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
npm run prisma:seed
```

## API Endpoints

These endpoints are intentionally simple so you can focus on the backend flow first.

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

You can paste these examples into Postman, Thunder Client, Scalar, or any API client while testing locally.

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

The controllers return a consistent response shape, so it is easier to recognize successful responses, validation errors, and service errors while debugging.

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

## Notes for Komtig's Activists

Keep this mindset while reading or modifying the project:

- Routes only define endpoint paths and middleware order.
- Controllers validate requests, call services, and shape responses.
- Services contain business rules, such as checking duplicate emails.
- Repositories contain database queries using Prisma.
- Docs files register OpenAPI paths for each feature.
- Zod validates incoming request bodies and route parameters.
- Prisma `include` is used in member queries to return related role data.
- You do not need to understand everything at once. Start from one endpoint, follow the files in order, and the architecture will become much easier to read.

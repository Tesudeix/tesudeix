# Tesudeix

Starter Next.js 15 project configured for MongoDB with an example REST API route and a companion Express backend.

## Requirements

- Node.js 18+ (Node.js 20 recommended)
- npm 9+
- A MongoDB deployment and credentials

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and add your MongoDB details:
   ```bash
   cp .env.example .env.local
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) and the sample API route at [http://localhost:3000/api/todos](http://localhost:3000/api/todos).

## Configuration

- `MONGODB_URI` – full MongoDB connection string (SRV or standard).
- `MONGODB_DB` – optional database name override (defaults to the connection string default).
- `MONGODB_COLLECTION` – collection name used by the sample `/api/todos` routes.
- `PORT` – port for the standalone Express backend (defaults to `4000`).

The MongoDB client is initialised once per process in `src/lib/mongodb.ts` and reused across requests to avoid exhausting connection pools.

## Backend server (Node.js)

The Express backend lives in `server/` and reuses the shared MongoDB client. Useful scripts:

- `npm run server:dev` – run the backend with auto-reload via `tsx watch`.
- `npm run server:build` – emit JavaScript to `dist/server`.
- `npm run server:start` – run the compiled backend (uses `dist/server/index.js`).

The backend exposes the same `/api/todos` endpoints as the Next.js route, plus a `/health` probe. By default it listens on [http://localhost:4000](http://localhost:4000).

## Sample API usage

Create a todo:

```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Wire up MongoDB"}'
```

Fetch the latest todos:

```bash
curl http://localhost:4000/api/todos
```

Swap the port back to `3000` to target the Next.js API route instead of the standalone backend.

## Project structure

- `src/app/page.tsx` – Landing page with quickstart instructions.
- `src/app/api/todos/route.ts` – Example GET/POST API handlers backed by MongoDB (Next.js).
- `src/lib/mongodb.ts` – Connection helper that caches the MongoDB client between requests.
- `server/app.ts` – Express app with matching todo routes and error handling.
- `server/index.ts` – Entry point that boots the backend using the shared configuration loader in `server/env.ts`.

Feel free to build additional pages in `src/app` and add more API routes under `src/app/api`.

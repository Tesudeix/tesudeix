# Tesudeix

Starter Next.js 15 project configured for MongoDB with an example REST API route.

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
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) and the sample API route at [http://localhost:3000/api/todos](http://localhost:3000/api/todos).

## Configuration

- `MONGODB_URI` – full MongoDB connection string (SRV or standard).
- `MONGODB_DB` – optional database name override (defaults to the connection string default).
- `MONGODB_COLLECTION` – collection name used by the sample `/api/todos` route.

The MongoDB client is initialised once per process in `src/lib/mongodb.ts` and reused across requests to avoid exhausting connection pools.

## Sample API usage

Create a todo:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Wire up MongoDB"}'
```

Fetch the latest todos:

```bash
curl http://localhost:3000/api/todos
```

## Project structure

- `src/app/page.tsx` – Landing page with quickstart instructions.
- `src/app/api/todos/route.ts` – Example GET/POST API handlers backed by MongoDB.
- `src/lib/mongodb.ts` – Connection helper that caches the MongoDB client between requests.

Feel free to build additional pages in `src/app` and add more API routes under `src/app/api`.

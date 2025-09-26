import "./env";

import express from "express";
import type { Request, Response, NextFunction } from "express";

import { getDb } from "../src/lib/mongodb";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/todos", async (_req, res, next) => {
  try {
    const db = await getDb();
    const collectionName = process.env.MONGODB_COLLECTION ?? "todos";

    const todos = await db
      .collection(collectionName)
      .find()
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const payload = todos.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    res.json({ todos: payload });
  } catch (error) {
    next(error);
  }
});

app.post("/api/todos", async (req, res, next) => {
  try {
    const { title, completed = false } = req.body ?? {};

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "`title` is required" });
    }

    const todo = {
      title,
      completed: Boolean(completed),
      createdAt: new Date(),
    };

    const db = await getDb();
    const collectionName = process.env.MONGODB_COLLECTION ?? "todos";
    const result = await db.collection(collectionName).insertOne(todo);

    res.status(201).json({ id: result.insertedId.toString(), ...todo });
  } catch (error) {
    next(error);
  }
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Backend error", error);
    res.status(500).json({ error: "Unexpected server error" });
  }
);

export default app;

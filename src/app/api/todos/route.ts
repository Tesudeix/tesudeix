import { NextResponse } from "next/server";

import { getDb } from "@/lib/mongodb";

const collectionName = process.env.MONGODB_COLLECTION ?? "todos";

export async function GET() {
  try {
    const db = await getDb();
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

    return NextResponse.json({ todos: payload });
  } catch (error) {
    console.error("GET /api/todos", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, completed = false } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "`title` is required" },
        { status: 400 }
      );
    }

    const todo = {
      title,
      completed: Boolean(completed),
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection(collectionName).insertOne(todo);

    return NextResponse.json(
      { id: result.insertedId.toString(), ...todo },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/todos", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

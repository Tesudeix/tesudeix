import "./env";

import process from "node:process";

import app from "./app";

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Backend ready on http://localhost:${port}`);
});

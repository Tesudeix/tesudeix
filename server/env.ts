import { config } from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";

const cwd = process.cwd();

const envFiles = [".env", ".env.local"];

for (const file of envFiles) {
  const fullPath = path.resolve(cwd, file);
  if (existsSync(fullPath)) {
    config({ path: fullPath });
  }
}

import fs from "node:fs";
import path from "node:path";

const src = path.resolve("./.next/static");
const dest = path.resolve("./.next/standalone/.next/static");

if (fs.existsSync(src)) {
  fs.cpSync(src, dest, { recursive: true });
  console.log(`[postbuild] Copied ${src} -> ${dest}`);
}

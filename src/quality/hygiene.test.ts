import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function filesUnder(...roots: string[]): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (
        [
          "node_modules",
          ".next",
          "dist",
          "coverage",
          "test-results",
          "playwright-report",
          ".git",
          ".vercel",
        ].includes(name)
      ) {
        continue;
      }
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else out.push(path.replace(/\\/g, "/"));
    }
  };
  roots.forEach((r) => existsSync(r) && walk(r));
  return out;
}

const read = (path: string) => readFileSync(path, "utf8");
const sourceFiles = filesUnder("src").filter((f) => /\.(ts|tsx)$/.test(f));

describe("Repository Hygiene & Quality Standards", () => {
  it("ships all standard open-source and evaluation documents", () => {
    const requiredDocs = [
      "README.md",
      "LICENSE",
      "SECURITY.md",
      "CONTRIBUTING.md",
      ".env.example",
      ".editorconfig",
      "vercel.json",
      "docs/ARCHITECTURE.md",
      "docs/ACCESSIBILITY.md",
      "docs/TESTING.md",
      "docs/DEPLOYMENT.md",
      ".github/workflows/ci.yml",
    ];

    for (const doc of requiredDocs) {
      expect(existsSync(doc), `Missing expected file: ${doc}`).toBe(true);
    }
  });

  it("enforces strict type safety: zero any or ts-ignore in source code", () => {
    for (const file of sourceFiles.filter((f) => !f.endsWith("hygiene.test.ts"))) {
      const text = read(file);
      // Skip type definition files
      if (file.endsWith(".d.ts")) continue;
      // Filter out code comments before checking for type annotations
      const codeOnly = text
        .split("\n")
        .filter((line) => !line.trim().startsWith("*") && !line.trim().startsWith("//"))
        .join("\n");
      expect(codeOnly, file).not.toMatch(/:\s*any\b|as any\b|<any>/);
      expect(text, file).not.toMatch(/@ts-ignore|@ts-nocheck/);
    }
  });

  it("never executes arbitrary code with eval or new Function", () => {
    for (const file of sourceFiles) {
      const text = read(file);
      expect(text, file).not.toMatch(/\beval\(|new Function\(/);
    }
  });

  it("contains no hardcoded secrets or API keys in source or docs", () => {
    const allFiles = filesUnder("src", "docs", "scripts").filter((f) =>
      /\.(ts|tsx|js|mjs|md|json)$/.test(f),
    );
    for (const file of allFiles) {
      const text = read(file);
      expect(text, file).not.toMatch(/AIza[0-9A-Za-z_-]{20,}/);
      expect(text, file).not.toMatch(/-----BEGIN [A-Z ]*PRIVATE KEY-----/);
    }
  });

  it("README documents setup, testing, deployment, and live link", () => {
    const readme = read("README.md");
    expect(readme).toContain("npm run dev");
    expect(readme).toContain("npm run test");
    expect(readme).toContain("npm run build");
    expect(readme).toContain("https://utsav1.vercel.app");
  });
});

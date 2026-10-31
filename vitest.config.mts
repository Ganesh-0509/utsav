import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "firebase/app": fileURLToPath(new URL("./node_modules/@firebase/app/dist/esm/index.esm.js", import.meta.url)),
      "firebase/auth": fileURLToPath(new URL("./node_modules/@firebase/auth/dist/esm/index.js", import.meta.url)),
      "firebase/firestore": fileURLToPath(new URL("./node_modules/@firebase/firestore/dist/index.esm.js", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.*",
        "src/app/**/page.tsx",
        "src/app/layout.tsx",
        "src/store/firebase.ts",
        "src/store/cloud.ts",
      ],
    },
  },
});

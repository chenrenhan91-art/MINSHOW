import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function spaFallback() {
  return {
    name: "spa-github-pages-fallback",
    closeBundle() {
      const index = resolve("dist/index.html");
      copyFileSync(index, resolve("dist/404.html"));
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), spaFallback()],
  server: {
    host: true,
    port: 5173,
  },
});
